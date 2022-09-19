const express = require("express");
const {createInvitation, verifyInvitation} = require("../../../controllers/user/v1/invitations/invitations");

const router = express.Router({mergeParams: true});

router.route('/').post(createInvitation);
router.route('/:id/verify').get(verifyInvitation);

module.exports = router;
