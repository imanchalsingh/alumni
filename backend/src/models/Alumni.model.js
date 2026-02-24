import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    father_name: String,
    course: { type: String, default: "BCA" },
    batch_year: { type: Number, required: true },
    designation: String,
    organization: String,
    email: String,
    address: String,
    mobile_number: String,
  },
  { timestamps: true }
);

const Alumni = mongoose.model("Alumni", alumniSchema);

export default Alumni;