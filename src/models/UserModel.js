const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Schema_User = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", Schema_User, "users");
