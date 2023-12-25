import { Schema, model, models } from "mongoose";

const FolderSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  flashCards: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

const Folder = models.Folder || model("Folder", FolderSchema);

export default Folder;
