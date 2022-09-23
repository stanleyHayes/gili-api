const express = require("express");
const {getMember, getMembers} = require("../../../controllers/user/v1/members/members");

const router = express.Router({mergeParams: true});
const {getClubs} = require("../../../controllers/user/v1/clubs/clubs");

router.route('/').get(getMembers);
router.route('/:address').get(getMember);
router.use('/:address/clubs', getClubs);
module.exports = router;
