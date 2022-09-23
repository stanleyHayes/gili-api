const Member = require("./../../models/v1/member");

exports.addMember = async (member) => {
    const createdMember = await Member.create(member);
    if (!createdMember) {
        return {code: 400, data: null, message: 'Something went wrong', success: false};
    }
    return {code: 201, data: createdMember, message: 'Joined club successfully', success: true};
}

exports.findMemberById = async (id) => {
    const member = await Member.findById(id);
    if (!member) {
        return {code: 404, data: null, success: false, message: 'Member not found'};
    }
    return {code: 200, data: member, success: true, message: 'Member retrieved'};
}

exports.findMember = async (query) => {
    const member = await Member.findOne(query);
    if (!member) {
        return {code: 404, data: null, success: false, message: 'Member not found'};
    }
    return {code: 200, data: member, success: true, message: 'Member retrieved'};
}


exports.findMembers = async (query, projection, populate) => {
    const members = await Member.find(query).populate(populate);
    return {code: 200, data: members, success: true, message: 'Member retrieved'};
}
