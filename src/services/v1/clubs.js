const Club = require("./../../models/v1/club");

exports.createClub = async (club) => {
    const newClub = await Club.create(club);
    if (newClub) {
        return {data: newClub, success: true, code: 201, message: 'Club Created Successfully'};
    }
    return {data: null, success: false, code: 400, message: 'Something went wrong'}
}

exports.updateClub = async (id, club) => {
    try {
        const foundClub = await Club.findById(id);
        for(let key in club){
            foundClub[key] = club[key];
        }
        const updatedClub = await foundClub.save();
        return {data: updatedClub, success: true, code: 200, message: 'Club updated successfully'}
    } catch (e) {
        return {data: null, success: false, code: 500, message: e.message}
    }
}

exports.getClubById = async (id, projection, populate) => {
    const club = await Club.findById(id, projection).populate(populate);
    if (club) {
        return {data: club, success: true, code: 200, message: 'Club Retrieved Successfully'};
    }
    return {data: null, success: false, code: 404, message: 'Club not found'};
}

exports.getClub = async (query) => {
    const club = await Club.findOne(query);
    if (club) {
        return {data: club, success: true, code: 200, message: 'Club Retrieved Successfully'};
    }
    return {
        club: club,
        success: false,
        code: 404,
        message: 'Club Not Found'
    };
}


exports.deleteClub = async (id) => {
}
