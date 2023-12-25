import { Schema, model, models } from "mongoose";

const QuestionsSchema = new Schema({
  question: {
    type: String,
    required: [true, "Title is required!"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required!"],
  },
  status: {
    type: String,
    enum: ["Remaining", "Mastered", "Still Learning"],
    default: "Remaining",
  },
  library: {
    type: Schema.ObjectId,
    ref: "Folder",
  },
  file: {
    type: Schema.ObjectId,
    ref: "File",
  },
});

const Questions = models.Questions || model("Questions", QuestionsSchema);

export default Questions;
