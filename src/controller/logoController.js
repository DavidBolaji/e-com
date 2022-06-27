const Logo = require("../models/logoModel");
const { cloudinary } = require("../utils/cloudinary");

exports.store = async (req, res) => {
  try {
    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
      folder: "e-commerce/logo",
      format: "png",
    });

    console.log(uploadRes);

    const image = new Logo({ pic: uploadRes.secure_url });
    await image.save();

    res.status(201).send({ image });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getAll = async (req, res) => {
  try {
    const pic = await Logo.find().sort({ createdAt: -1 });

    if (!pic) {
      throw new Error();
    }

    res.status(200).send(pic);
  } catch (error) {
    res.status(400).send({ error: "pic not found" });
  }
};
