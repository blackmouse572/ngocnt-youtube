const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

exports.default = mongoose.model("Comment", CommentSchema);

//export schema
exports.CommentSchema = CommentSchema;
