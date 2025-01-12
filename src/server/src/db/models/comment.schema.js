import mongoose from "mongoose";

const { Schema } = mongoose;

const replySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    refPath: "userModel",
    required: true,
  },
  userModel: {
    type: String,
    required: true,
    enum: ["User", "AnonymousUser"],
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    refPath: "userModel",
    required: true,
  },
  userModel: {
    type: String,
    required: true,
    enum: ["User", "AnonymousUser"],
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
