import mongoose from "mongoose";
import IPost from "./interface";
import IProfile from "./interface";
const PostScheme = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      text: {
        type: {
          type: String,
          required: true,
        },
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model<IPost & mongoose.Document>("posts", PostScheme);
