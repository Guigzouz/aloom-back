const users = [];
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  //CHANGE LOGIC FOR BDD IMPLEMENTATION
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send(user);
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
  create,
  login,
  hello,
};