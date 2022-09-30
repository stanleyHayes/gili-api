const clubServices = require("./../../../../services/v1/clubs");
const memberServices = require("../../../../services/v1/members");
const invitationServices = require("../../../../services/v1/invitations");
const Member = require("./../../../../models/v1/member");

exports.createClub = async (req, res) => {
    try {
        const {
            name,
            token,
            goal,
            duration,
            currency,
            maximumMemberCount,
            safeAddress,
            createdBy,
            network
        } = req.body;


        if (!name || !token || !goal || !duration || !maximumMemberCount || !safeAddress || !currency || !createdBy || !network) {
            return res.status(400).json({message: 'Missing required fields', data: null});
        }

        const {success} = await clubServices.getClub({token});
        if (success) {
            return res.status(409).json({
                data: null,
                message: 'Token already taken',
            });
        }

        const {data, code, message, success: createClubSuccess} = await clubServices.createClub({
            name,
            token,
            goal,
            duration,
            currency,
            maximumMemberCount,
            safeAddress,
            createdBy,
            network
        });

        if (!createClubSuccess) {
            return res.status(code).json({
                data: null,
                message,
            });
        }
        res.status(code).json({message, data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getClub = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, data, code, message} =
            await clubServices.getClubById(id, {}, {path: 'members'});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(200).json({message, data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.depositFunds = async (req, res) => {
    try {
        const {amount, address, club} = req.body;
        const findClubResponse = await clubServices.getClub({_id: club});
        if (!findClubResponse.success) {
            return res.status(404).json({message: 'Club not found'});
        }
        const clubMemberResponse = await memberServices.findMember({address, club});
        if (!clubMemberResponse.success) {
            return res.status(404).json({message: 'You do not belong to this club'});
        }

        // find club members
        const clubMembersResponse = await memberServices.findMembers({club});

        const treasury = findClubResponse.data.treasury;
        const goal = findClubResponse.data.goal;
        const totalTreasury = treasury + amount;

        const members = clubMembersResponse.data;

        // update members stakes and ownerships
        for (let i = 0; i < members.length; i++) {
            if (address === members[i].address) {
                members[i].stake = members[i].stake + amount;
                members[i].ownership = members[i].stake / totalTreasury;
            } else {
                members[i].ownership = members[i].stake / totalTreasury;
            }
            await members[i].save();
        }
        const totalMinted = totalTreasury / goal;
        const updatedMemberResponse = await memberServices.findMember({address});

        // update club data
        const update = {...findClubResponse.data, minted: totalMinted, treasury: totalTreasury};
        const updatedClub = await clubServices.updateClub(findClubResponse.data._id, update);
        res.status(200).json({
            message: 'Deposit successfully recorded',
            data: updatedClub.data,
            member: updatedMemberResponse.data
        })

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getClubBySafe = async (req, res) => {
    try {
        const {address} = req.params;
        const {success, data, code, message} =
            await clubServices.getClub({safeAddress: address});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(200).json({message, data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateClub = async (req, res) => {
    try {
        const {id} = req.params;
        const {address} = req.body;
        const findClubResponse = await clubServices.getClub({_id: id});
        if (!findClubResponse.success) {
            return res.status(404).json({message: 'Club not found'});
        }
        const findClubMemberResponse = await memberServices.findMember({address, club: id});
        if (!findClubMemberResponse.success) {
            return res.status(404).json({message: 'You are not a member of ths club'});
        }
        if (findClubMemberResponse.data.role !== 'Admin') {
            return res.status(401).json({message: 'You are not authorized to perform this operation'});
        }
        delete req.body['address'];
        const updatedClubResponse = await clubServices.updateClub(id, req.body);
        if (!updatedClubResponse.success) {
            return res.status(400).json({message: 'Something went wrong'});
        }
        res.status(200).json({
            message: 'Club updated Successfully',
            data: updatedClubResponse.data,
            member: findClubMemberResponse.data
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteClub = async (req, res) => {
    try {
        res.status(200).json({message: 'Club removed Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getClubs = async (req, res) => {
    try {
        const {address} = req.params;
        const findClubsResponse = await memberServices.findMembers({address});
        const clubs = [];
        for (let i = 0; i < findClubsResponse.data.length; i++) {
            const club = findClubsResponse.data[i].club;
            const findClubResponse = await clubServices.getClubById(club, {}, {path: 'members'});
            clubs.push(findClubResponse.data);
        }
        res.status(200).json({message: 'Clubs retrieved Successfully', data: clubs});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.joinClub = async (req, res) => {
    try {
        const {amount, address, invitation} = req.body;
        const {club} = req.params;
        // check that club exists
        const findClubResponse = await clubServices.getClub({_id: club});
        if (!findClubResponse.success) {
            return res.status(404).json({message: 'Club not found'});
        }

        const existingMember = await memberServices.findMember({club, address});
        if (existingMember.success) {
            return res.status(200).json({message: 'Member already belong to the club', data: findClubResponse.data, member: existingMember.data});
        }

        let findInvitationResponse = null;

        const isCreator = address === findClubResponse.data.createdBy;
        // check that user was really invited
        if (!isCreator) {
            findInvitationResponse = await invitationServices.getInvitationById(invitation);
            if (!findInvitationResponse.success) {
                return res.status(404).json({message: 'Invitation not found'});
            }

            if (findInvitationResponse.data.status !== 'Verified') {
                return res.status(400).json({message: 'Invitation not verified'});
            }

            if (findInvitationResponse.data.status === 'Used') {
                return res.status(400).json({message: 'Invitation already used'});
            }
        }

        // find club members
        const clubMembersResponse = await memberServices.findMembers({club});

        const membersCount = await Member.find({club}).countDocuments();

        // ensure members don't exceed maximum number of allowed members
        if (membersCount === findClubResponse.data.maximumMemberCount) {
            return res.status(400).json({message: 'Maximum member count reached'});
        }

        const treasury = findClubResponse.data.treasury;
        const goal = findClubResponse.data.goal;
        const totalTreasury = treasury + parseFloat(amount);

        const members = clubMembersResponse.data;

        // update members stakes and ownerships
        for (let i = 0; i < members.length; i++) {
            members[i].ownership = members[i].stake / totalTreasury;
            await members[i].save();
        }
        const totalMinted = totalTreasury / goal;
        const member = {
            club,
            role: isCreator ? 'Admin' : findInvitationResponse?.data.role,
            address,
            ownership: parseFloat(amount) / totalTreasury,
            stake: parseFloat(amount)
        };

        // create a new member
        const newMember = await memberServices.addMember(member);

        // update club data
        const update = {...findClubResponse.data, minted: totalMinted, treasury: totalTreasury, invitation};
        const updatedClub = await clubServices.updateClub(findClubResponse.data._id, update);

        if (findInvitationResponse) {
            findInvitationResponse.data.status = 'Used';
            await findInvitationResponse.data.save();
        }
        res.status(200).json({message: 'Joined club successfully', data: updatedClub.data, member: newMember.data});
    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message});
    }
}


exports.addMember = async (req, res) => {
    try {
        const {address, role, admin} = req.body;
        const {club} = req.params;
        // check that club exists
        const findClubResponse = await clubServices.getClub({_id: club}, {path: 'members'});
        if (!findClubResponse.success) {
            return res.status(404).json({message: 'Club not found'});
        }

        const findAdminResponse = await memberServices.findMember({club, admin});
        if (!findAdminResponse.success) {
            return res.status(400).json({message: 'You are not a member of this club'});
        }

        if (findAdminResponse.data.role !== 'Admin') {
            return res.status(400).json({message: 'You are not allowed to perform this operation'});
        }

        const existingMember = await memberServices.findMember({club, address});
        if (existingMember.success) {
            return res.status(400).json({message: 'Member already belong to the club'});
        }

        const membersCount = await Member.find({club}).countDocuments();

        // ensure members don't exceed maximum number of allowed members
        if (membersCount === findClubResponse?.data?.maximumMemberCount) {
            return res.status(400).json({message: 'Maximum member count reached'});
        }


        const member = {
            club,
            role,
            address,
            ownership: 0,
            stake: 0
        };

        // create a new member
        const newMember = await memberServices.addMember(member);

        res.status(200).json({
            message: 'Added member to club successfully',
            data: findClubResponse.data,
            member: newMember.data
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
