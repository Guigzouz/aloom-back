const { Friend } = require("../../models");
const { Op, Sequelize } = require("sequelize");

// FRIEND REQUESTS ENDPOINTS

const sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Define the new friend request object
    const friendRequest = {
      userId,
      friendId,
      isRequestPending: true,
      isActive: false,
      isBlocked: false,
    };

    // Check for existing request or inactive friendship
    const existingRequest = await Friend.findOne({
      where: {
        [Op.or]: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
        isRequestPending: true,
      },
    });

    const existingFriendship = await Friend.findOne({
      where: {
        [Op.or]: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
        isActive: false,
      },
    });

    if (existingRequest) {
      res.status(400).send("Friend request already sent, wait for a response");
      return;
    }

    if (existingFriendship) {
      // Update the existing inactive friendship to become a pending request
      await existingFriendship.update({
        isRequestPending: true,
        isActive: false,
        isBlocked: false,
      });

      res.status(200).json({
        message: "Friend request re-sent",
        friendRequest: existingFriendship,
      });
      return;
    }

    // Create a new friend request if no inactive friendship exists
    const sentFriendRequest = await Friend.create(friendRequest);

    res.status(200).json({
      message: "Request sent",
      friendRequest: sentFriendRequest,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const getFriendRequest = async (req, res) => {
  try {
    const pendingRequest = await Friend.findAll({
      where: {
        friendId: req.body.userId,
        isRequestPending: true,
      },
    });

    if (pendingRequest) {
      res.status(201).json({
        message: "request(s) retrieved",
        friendRequest: pendingRequest,
      });
      return;
    }

    res.status(400).send("no pending friend requests for you :(");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const currentRequest = await Friend.findOne({
      where: {
        userId: req.body.userId,
        friendId: req.body.friendId,
        isRequestPending: true,
      },
    });

    if (currentRequest) {
      const acceptedFriendRequest = await Friend.update(
        {
          isRequestPending: false, // changing pending
          isActive: true, // changing active status
        },
        {
          where: {
            userId: req.body.userId,
            friendId: req.body.friendId,
            isRequestPending: true,
          },
          returning: true, // If you want the updated record(s) to be returned
        }
      );

      res.status(200).json({
        message: "request accepted",
        friendRequest: acceptedFriendRequest,
      });
      return;
    }

    res.status(400).send("No requests found here");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const declineFriendRequest = async (req, res) => {
  try {
    const currentRequest = await Friend.findOne({
      where: {
        userId: req.body.userId,
        friendId: req.body.friendId,
        isRequestPending: true,
      },
    });

    if (currentRequest) {
      const declinedFriendRequest = await Friend.update(
        {
          isRequestPending: false, // changing pending
          isActive: false, // changing active status
        },
        {
          where: {
            userId: req.body.userId,
            friendId: req.body.friendId,
            isRequestPending: true,
          },
          returning: true, // If you want the updated record(s) to be returned
        }
      );

      res.status(200).json({
        message: "request declined",
        friendRequest: declinedFriendRequest,
      });
      return;
    }

    res.status(400).send("No requests found here");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

// FRIEND RELATION HANDLING ENDPOINTS

const getFriendsList = async (req, res) => {
  try {
    const userId = req.params.userId;

    const friends = await Friend.findAll({
      where: {
        [Sequelize.Op.or]: [{ friendId: userId }, { userId: userId }],
        isRequestPending: false,
        isBlocked: false,
        isActive: true,
      },
    });

    if (friends.length > 0) {
      res.status(200).json({
        message: "Friend(s) retrieved",
        friendsList: friends,
      });
    } else {
      res.status(404).send("No friends found");
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

// CONDITION OU PARCEQUE ON PEUT ETRE SOIT FRIEND
// SOIT USER DANS UNE RELATION EN FONCTION DE QUI A AJOUTE QUI

const removeFriend = async (req, res) => {
  console.log(req.body);
  try {
    const currentFriend = await Friend.findOne({
      where: {
        [Op.or]: [
          {
            userId: req.body.userId,
            friendId: req.body.friendId,
          },
          {
            userId: req.body.friendId,
            friendId: req.body.userId,
          },
        ],
        isRequestPending: false,
        isActive: true,
        isBlocked: false,
      },
    });

    console.log(currentFriend);
    if (currentFriend) {
      const removedFriend = await Friend.update(
        {
          isActive: false, // changing active status
        },
        {
          where: {
            [Op.or]: [
              {
                userId: req.body.userId,
                friendId: req.body.friendId,
              },
              {
                userId: req.body.friendId,
                friendId: req.body.userId,
              },
            ],
            isRequestPending: false,
            isActive: true,
            isBlocked: false,
          },
          returning: true, // If you want the updated record(s) to be returned
        }
      );

      res.status(200).json({
        message: "Friend removed",
        friendRemoved: removedFriend[1], // Updated records are in the second element of the returned array
      });
      return;
    }

    res.status(400).send("No friend found here");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const blockFriendRequestFromUser = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Find the friendship in either direction
    const friendship = await Friend.findOne({
      where: {
        [Op.or]: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (friendship) {
      // Update the friendship to set isBlocked to true
      await friendship.update({
        isBlocked: true,
      });

      res.status(200).json({
        message: "Friend request blocked",
        updatedFriendship: friendship,
      });
      return;
    }

    // If no friendship is found
    res.status(400).send("No friend request found to block");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  getFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendsList,
  removeFriend,
  blockFriendRequestFromUser,
};
