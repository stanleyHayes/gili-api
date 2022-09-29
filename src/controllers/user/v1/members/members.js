const memberServices = require("./../../../../services/v1/members");

exports.getMembers = async (req, res) => {
    try {
        const {club} = req.params;
        const findMembersResponse = await memberServices.findMembers({club});
        res.status(200).json({message: 'Members retrieved successfully', data: findMembersResponse.data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getMember = async (req, res) => {
    try {
        const {address, club} = req.params;
        console.log(address, club)
        const findMemberResponse = await memberServices.findMember({address, club});
        console.log(findMemberResponse.data)
        res.status(findMemberResponse.code).json({message: findMemberResponse.message, data: findMemberResponse.data})
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
