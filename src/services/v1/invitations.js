const Invitation = require("./../../models/v1/invitation");

exports.createInvitation = async (invitation) => {
    const createdInvitation = await Invitation.create(invitation);
    if(!createdInvitation){
        return {success: false, code: 400, message: 'Something went wrong', data: null};
    }
    return {data: createdInvitation, success: true, code: 201, message: 'Invitation created Successfully'};
}

exports.getInvitation = async (query) => {
    const invitation = await Invitation.findOne(query);
    if(!invitation){
        return {data: null, code: 404, success: false, message: 'Invitation not found'};
    }
    return {data: invitation, code: 200, success: true, message: 'Invitation Retrieved Successfully'};
}

exports.getInvitationById = async (id) => {
    const invitation = await Invitation.findById(id);
    if(!invitation){
        return {data: null, code: 404, success: false, message: 'Invitation not found'};
    }
    return {data: invitation, code: 200, success: true, message: 'Invitation Retrieved Successfully'};
}

exports.updateInvitation = async (id, invitation) => {
    const foundInvitation = await Invitation.findById(id);
    for(let key in invitation){
        foundInvitation[key] = invitation[key];
    }
    const updatedInvitation = await foundInvitation.save();
    await updatedInvitation.populate({path: 'club'});
    return {data: updatedInvitation, code: 200, success: true, message: 'Invitation Retrieved Successfully'};
}
