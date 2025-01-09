const { UserPost, User } = require("../../models");
const { Op, Sequelize, where } = require("sequelize");
const jwt = require("jsonwebtoken");

const getPosts = async (req, res) => {
  try {
    const posts = await UserPost.findAndCountAll({
      where: {
        createdAt: {
          [Op.gt]: Sequelize.literal("NOW() - INTERVAL '24 HOURS'"),
        },
      },
      include: {
        model: User,
        as: "author", // Specify the alias here
        attributes: ["firstName", "lastName", "countryKey", "nickname"],
      },
    });

    if (posts.count > 0) {
      res.status(201).json({
        message: "post(s) retrieved",
        posts: posts,
      });
      return;
    }
    res.status(400).send("no posts found in the last 24h");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await UserPost.findAndCountAll({
      where: {
        createdAt: {
          [Op.gt]: Sequelize.literal("NOW() - INTERVAL '24 HOURS'"),
        },
        authorId: req.params.userId,
      },
    });

    if (posts.count > 0) {
      res.status(201).json({
        message: "post(s) retrieved",
        posts: posts,
      });
      return;
    }
    res.status(400).send("no posts found in the last 24h");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const getPostDetails = async (req, res) => {
  try {
    const postDetails = await UserPost.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (postDetails) {
      res.status(201).json({
        message: "post informations found",
        postDetails: postDetails,
      });
    }

    res.status(400).send("no post found at this id");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    // Get the JWT from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    // Verify and decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key

    // Extract the user ID from the decoded token
    const userId = decoded._id; // Ensure the payload includes the user ID
    console.log(userId);
    // Build the post content
    const postContent = {
      content: req.body.content,
      fileAttachmentId: req.body.fileAttachmentId,
      authorId: userId, // Assign the post to the user
    };

    // Save the post
    const post = await UserPost.create(postContent);

    // Respond with the created post
    res.status(200).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const targetPost = await UserPost.findOne({
      where: {
        id: req.params.postId,
        authorId: req.body.userId,
      },
    });

    if (!targetPost) {
      res.status(400).send({ message: "No post found at this id" });
      return;
    }

    const deletedPost = await UserPost.update(
      { isActive: false },
      { where: { id: req.params.postId, authorId: req.body.userId } }
    );

    if (deletedPost) {
      res.status(400).send({ message: "No post found at this id" });
      return;
    }

    res.status(200).send({
      message: "Post deactivated successfully",
      deletedPost: deletedPost,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content, fileAttachmentId } = req.body;

    // Find the target post
    const targetPost = await UserPost.findOne({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!targetPost) {
      res
        .status(400)
        .send({ message: "No post found with this id and authorId" });
      return;
    }

    // Check for changes
    const changes = {};
    if (content && content !== targetPost.content) {
      changes.content = content;
    }
    if (fileAttachmentId && fileAttachmentId !== targetPost.fileAttachmentId) {
      changes.fileAttachmentId = fileAttachmentId;
    }

    // If no changes, return without updating
    if (Object.keys(changes).length === 0) {
      res.status(200).send({ message: "No changes detected" });
      return;
    }

    // Update the post with the detected changes
    const [updatedRowCount] = await UserPost.update(changes, {
      where: { id: postId, authorId: userId },
    });

    if (updatedRowCount === 0) {
      res.status(400).send({ message: "Failed to update the post" });
      return;
    }

    res.status(200).send({ message: "Post updated successfully", changes });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getPosts,
  getUserPosts,
  getPostDetails,
  createPost,
  deletePost,
  updatePost,
};
