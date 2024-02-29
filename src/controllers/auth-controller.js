const bcrypt = require("bcrypt");
const { User } = require("../../models");

const createUser = async (req, res) => {
  console.log("je rentre dans createUser");
  //CHANGE LOGIC FOR BDD IMPLEMENTATION
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = req.body;
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

const hello = async (req, res) => {
  res.json(users);
};

module.exports = {
  createUser,
  login,
  hello,
};
