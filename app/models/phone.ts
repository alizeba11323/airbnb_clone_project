import mongoose from "mongoose";

const PhoneSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  code: { type: String, required: true },
});
const PhoneModel =
  mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);
export default PhoneModel;
