const {getClub, createClub, updateClub, deleteClub, getClubs} = require("./clubs/clubs");

module.exports = {
    club: {getClub, createClub, updateClub, deleteClub, getClubs},
}
