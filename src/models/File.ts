import { Schema, model, models } from "mongoose";

const FileSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  folder: {
    type: Schema.ObjectId,
    ref: "Folder",
  },
});

const File = models.File || model("File", FileSchema);

export default File;
