"use strict";

const express = require("express");
const router = express.Router();
const { friendController } = require("../controllers/index");

router.get("/get-request", friendController.getFriendRequest);
router.get("/get-friends-list", friendController.getFriendsList);
router.put("/send-request", friendController.sendFriendRequest);
router.put("/block-friend", friendController.blockFriendRequestFromUser);
router.patch("/accept-request", friendController.acceptFriendRequest);
router.patch("/decline-request", friendController.declineFriendRequest);
router.patch("/remove-friend", friendController.removeFriend);

module.exports = router;
