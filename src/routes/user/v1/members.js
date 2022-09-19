const express = require("express");
const {getMember, getMembers} = require("../../../controllers/user/v1/members/members");

const router = express.Router({mergeParams: true});

router.route('/').get(getMembers);
router.route('/:id').get(getMember);

module.exports = router;
