const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

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
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
      console.log("success");

      const token = jwt.sign(
        { _id: user.id, email: user.email },
        process.env.JWT_SECRET
      );

      console.log("token :", token);
      res.status(200).send({ authData: user, jwt: token });
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
