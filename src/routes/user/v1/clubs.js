const express = require("express");
const {createClub, getClubs, getClub, updateClub, deleteClub, joinClub} = require("../../../controllers/user/v1/clubs/clubs");

const router = express.Router({mergeParams: true});
const membersRoute = require("./members");

router.use('/:club/members', membersRoute);
router.route('/').post(createClub).get(getClubs);
router.route('/:id').get(getClub).put(updateClub).delete(deleteClub);
router.route('/:club/join').post(joinClub);

module.exports = router;
