import mongoose from "mongoose";

const { Schema } = mongoose;

const caseSchema = new Schema({
  content: { type: String, required: true },
  proof: [{ type: String }],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  examples: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category.examples",
      required: true,
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    refPath: "authorModel",
    required: true,
  },
  authorModel: {
    type: String,
    required: true,
    enum: ["User", "AnonymousUser"],
  },
  isAnonymous: { type: Boolean, default: false },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Case = mongoose.model("Case", caseSchema);

export default Case;
