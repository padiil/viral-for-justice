import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  followingCase: [{ type: Schema.Types.ObjectId, ref: "Case" }],
  profilePicture: { type: String },
  notifications: [notificationSchema],
});

const anonymousUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  followingCase: [{ type: Schema.Types.ObjectId, ref: "Case" }],
  profilePicture: { type: String },
  notifications: [notificationSchema],
});

const User = mongoose.model("User", userSchema);
const AnonymousUser = mongoose.model("AnonymousUser", anonymousUserSchema);
const Notification = mongoose.model("Notification", notificationSchema);

export { User, AnonymousUser, Notification };
