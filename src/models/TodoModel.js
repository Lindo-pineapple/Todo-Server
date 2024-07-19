import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const Schema_Todo = new Schema(
  {
    todo: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    isDone: {
      required: true,
      type: Boolean,
    },
    userId: {
      required: true,
      type: ObjectId,
    },
  },
  { timestamps: true }
);

export default model("todos", Schema_Todo);
