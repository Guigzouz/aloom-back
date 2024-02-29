const bcrypt = require("bcrypt");
const { User } = require("../../models");

const createUser = async (req, res) => {
  try {
    const user = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      hashedPassword: await bcrypt.hash(req.body.password, 10),
      phoneNumber: req.body.phoneNumber,
      countryKey: req.body.country,
    };

    console.log(user);

    const createdUser = await User.create(user);
    console.log("created user:", createdUser);
    res.status(201).send(createdUser);
  } catch {
    res.status(500).send();
  }
};

const login = async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
};

module.exports = {
  createUser,
  login,
};
