const moment = require("moment");

const clubServices = require("./../../../../services/v1/clubs");
const invitationServices = require("./../../../../services/v1/invitations");
const memberServices = require("./../../../../services/v1/members");

exports.createInvitation = async (req, res) => {
    try {
        const {role, club, inviter} = req.body;
        // check that club exists
        const {success} = await clubServices.getClub({_id: club});
        if (!success) return res.status(404).json({message: 'Club not found'});

        // check that user is a member of club
        const findMemberResponse = await memberServices.findMember({address: inviter, club});
        if (!findMemberResponse.success) {
            return res.status(404).json({message: 'You are not a member of this club'});
        }

        // check that user is an admin
        if (findMemberResponse.data.role !== 'Admin') {
            return res.status(401).json({message: 'You do not have the rights to invite a user'});
        }

        // create invitation
        const createdInvitationResponse = await invitationServices.createInvitation({
            role, club, inviter
        });
        res.status(createdInvitationResponse.code).json({
            message: createdInvitationResponse.message, data: createdInvitationResponse.data
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.verifyInvitation = async (req, res) => {
    try {
        const {id} = req.params;

        // check if invitation exists
        const findInvitationResponse = await invitationServices.getInvitation({_id: id});
        if (!findInvitationResponse.success) {
            return res.status(findInvitationResponse.code).json({
                message: findInvitationResponse.message, data: findInvitationResponse.data
            });
        }

        const findClubResponse = await clubServices.getClub({_id: findInvitationResponse.data.club});
        if (!findClubResponse.success) {
            return res.status(404).json({message: 'Club not found'});
        }

        // calculate expiry date of club
        const expiryDate = moment(findClubResponse.data.createdAt)
            .add(findClubResponse.data.duration.amount, findClubResponse.data.duration.unit);

        // check if club is still open
        if (moment().isSameOrAfter(expiryDate)) {
            await invitationServices.updateInvitation(id, {status: 'Expired'});
            return res.status(400).json({message: 'Invitation expired'});
        }

        const invitationResponse = await invitationServices.updateInvitation(
            findInvitationResponse.data._id,
            {status: 'Verified'}
        );
        res.status(200).json({message: 'Invitation verified', data: invitationResponse.data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
