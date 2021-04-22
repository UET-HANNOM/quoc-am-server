import mongoose from "mongoose";
import IBook from "./interface";
const BookSchema = new mongoose.Schema({
  imgSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  contributors: {
    type: mongoose.Schema.Types.ObjectId,
  },
  pages: [
    {
      pageNumber: {
        type: String,
        required: true,
      },
      imgSrc: {
        type: String,
        required: true,
      },
      quocam: {
        type: String,
      },
      hannom: {
        type: String,
      },
      words: [
        {
          type: {
            type: Boolean,
            default: true,
          },
          rawWord: {
            type: String,
            required: true,
          },
          transliteration: {
            type: String,
            required: true,
          },
          translation: {
            type: String,
            required: true,
          },
          soundSrc: {
            type: String,
          },
          dictionarySrc: {
            type: String,
          },
        },
      ],
    },
  ],
});

export default mongoose.model<IBook & mongoose.Document>("books", BookSchema);
