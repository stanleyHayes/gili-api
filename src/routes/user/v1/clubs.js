const express = require("express");
const {
    createClub,
    getClubs,
    getClub,
    updateClub,
    deleteClub,
    joinClub,
    getClubBySafe,
    depositFunds, addMember
} = require("../../../controllers/user/v1/clubs/clubs");

const router = express.Router({mergeParams: true});
const membersRouter = require("./members");

router.use('/:club/members', membersRouter);
router.route('/').post(createClub).get(getClubs);
router.route('/:id').get(getClub).put(updateClub).delete(deleteClub);
router.route('/:club/join').post(joinClub);
router.route('/:club/member/add').post(addMember);
router.route('/:club/funds/deposit').put(depositFunds);
router.route('/:address/safe').get(getClubBySafe);

module.exports = router;
