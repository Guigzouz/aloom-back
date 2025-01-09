"use strict";

const express = require("express");
const router = express.Router();
const { postController } = require("../controllers/index");
const { verifyAccessToken } = require("../helpers/jwt-helper");

router.get("/get-posts", verifyAccessToken, postController.getPosts);
router.get(
  "/get-user-posts/:userId",
  verifyAccessToken,
  postController.getUserPosts
);
router.get(
  "/get-post/:postId",
  verifyAccessToken,
  postController.getPostDetails
);
router.post("/create-post", verifyAccessToken, postController.createPost);
router.patch(
  "/delete-post/:postId",
  verifyAccessToken,
  postController.deletePost
);
router.patch(
  "/update-post/:postId",
  verifyAccessToken,
  postController.updatePost
);

module.exports = router;
