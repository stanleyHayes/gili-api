const express = require("express");

const router = express.Router();

const clubsV1Router = require("./clubs");
const invitationsV1Router = require("./invitations");

router.use('/clubs', clubsV1Router);
router.use('/invitations', invitationsV1Router);

module.exports = router;
