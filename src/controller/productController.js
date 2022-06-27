const Product = require("../models/productModel");
const { cloudinary } = require("../utils/cloudinary");

exports.create = async (req, res) => {
  try {
    const product = new Product({ ...req.body });
    await product.save();

    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
      public_id: product._id,
      folder: "e-commerce/product",
    });

    product.img = uploadRes.secure_url;

    await product.save();

    res.status(201).send({ product });
  } catch (e) {
    res.status(500).send({ e: "Unable to create" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deleteProduct = await Product.deleteOne({ _id: { $eq: productId } });

    const deleteCloudProductImg = await cloudinary.uploader.destroy(
      `e-commerce/product/${productId}`
    );

    if (!deleteProduct) {
      throw new Error("Unable to delete Blog");
    }

    res.status(200).send(deleteProduct);
  } catch (e) {
    res.status(400).send({ e: "Unable to delete Blog" });
  }
};

exports.getProducts = async (req, res) => {
  let limitValue, skipValue;
  if (!req.query.side) {
    limitValue = req.query.limit || 6;
  } else {
    limitValue = req.query.limit || 30;
  }
  console.log(req.query);
  skipValue = req.query.skip || 0;
  console.log(skipValue);
  try {
    const total = await Product.find({});
    const products = await Product.find({})
      .limit(limitValue)
      .skip(limitValue * +skipValue);
    if (!products) {
      throw new Error("error");
    }
    return res.status(200).send({ products, total: total.length });
  } catch (e) {
    res.status(400).send({ e: "Product not found" });
  }
};

exports.getOneProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw new Error("error");
    }

    res.status(200).send(product);
  } catch (e) {
    res.status(400).send({ e: "Product not found" });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;

  const presentUpdate = Object.keys(req.body);

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new Error("error");
    }

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        public_id: product._id,
        folder: "e-commerce/product",
        format: "png",
        transformation: [
          {
            width: 2000,
            height: 1250,
            crop: "fill",
          },
        ],
      });

      product.img = uploadRes.secure_url;
    }

    presentUpdate.forEach((key) => {
      blog[key] = req.body[key];
    });

    await product.save();

    res.status(200).send(product);
  } catch (e) {
    res.status(400).send({ e: "Product not found" });
  }
};
