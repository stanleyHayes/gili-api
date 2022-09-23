const express = require("express");

const router = express.Router({mergeParams: true});

const clubsV1Router = require("./clubs");
const membersV1Router = require("./members");
const invitationsV1Router = require("./invitations");

router.use('/clubs', clubsV1Router);
router.use('/members', membersV1Router);
router.use('/invitations', invitationsV1Router);

module.exports = router;
