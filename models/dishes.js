const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;
const commentSchema = require("./comments").CommentSchema;

const Schema = mongoose.Schema;

const dishSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
    price: {
      type: Currency,
      default: 0,
      min: 0,
      require: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

//Export Dishes model
module.exports = mongoose.model("Dish", dishSchema);
