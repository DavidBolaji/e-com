const mongoose = require("../db/mongoose");

const logoSchema = new mongoose.Schema(
  {
    pic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Logo = mongoose.model("Logo", logoSchema);

module.exports = Logo;
