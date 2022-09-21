const express = require("express");
const {createClub, getClubs, getClub, updateClub, deleteClub, joinClub, getClubBySafe, depositFunds} = require("../../../controllers/user/v1/clubs/clubs");

const router = express.Router({mergeParams: true});
const membersRoute = require("./members");

router.use('/:club/members', membersRoute);
router.route('/').post(createClub).get(getClubs);
router.route('/:id').get(getClub).put(updateClub).delete(deleteClub);
router.route('/:club/join').post(joinClub);
router.route('/:club/deposit').post(depositFunds);
router.route('/:address/safe').get(getClubBySafe);

module.exports = router;
