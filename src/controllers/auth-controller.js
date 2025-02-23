const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Token } = require("../../models");

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hashedPassword: await bcrypt.hash(req.body.password, 10),
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
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
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
        { expiresIn: "24h" }
      );

      const hashedToken = await bcrypt.hash(token, 10); // Hash JWT before storing

      const existingUserSession = await Token.findOne({
        where: { userId: user.id },
      });

      if (existingUserSession) {
        existingUserSession.authToken = hashedToken;
        await existingUserSession.save();
      } else {
        await Token.create({ userId: user.id, authToken: hashedToken });
      }

      res.status(200).send({ jwt: token });
    } else {
      res.status(203).send("Not Allowed");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createUser,
  login,
};
