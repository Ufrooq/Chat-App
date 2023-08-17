import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required !"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required !"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is required !"],
  },
  isAvatarImage: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastOnline: {
    type: Date,
    default: null,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
