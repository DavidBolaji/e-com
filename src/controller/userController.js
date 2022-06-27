const User = require("../models/userModel");
const { cloudinary } = require("../utils/cloudinary");

exports.register = async (req, res) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
    const token = await user.genAuthToken();

    console.log(user._id);

    await user.save();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.validateUser(req.body.email, req.body.password);
    const token = await user.genAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ e: "Unable to login" });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token !== token.token;
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
