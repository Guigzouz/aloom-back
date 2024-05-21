const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Token } = require("../../models");
const { where } = require("sequelize");

const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hashedPassword: await bcrypt.hash(req.body.password, 10),
      phoneNumber: req.body.phoneNumber,
      countryKey: req.body.countryKey,
    };

    const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingEmail) {
      res.status(400).send("this email is already used");
      return;
    }

    const createdUser = await User.create(user);

    console.log("created user:", createdUser);
    res.status(201).send(createdUser);
  } catch {
    res.status(500).send();
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
      console.log("success");

      const token = jwt.sign(
        {
          _id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      const existingUserSession = await Token.findOne({
        where: { userId: user.id },
      });

      // if already a session for said user, updates the token to replicate in frontend
      // ISSUING A JWT TO DATABASE IS NOT USED FOR SESSIONS BUT RATHER EMAIL VERIFICATIONS DO NOT USE TO CHECK AUTH
      if (existingUserSession) {
        existingUserSession.authToken = token;
        await existingUserSession.save();
      } else {
        const userSession = {
          userId: user.id,
          authToken: token,
        };

        await Token.create(userSession);
        res.status(200).send({ jwt: token });
      }

      res.status(200).send({ jwt: token });
    } else {
      res.status(203).send("Not Allowed");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createUser,
  login,
};
