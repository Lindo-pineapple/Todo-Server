import mongoose from "mongoose";

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

export default mongoose.model("users", Schema_User);
