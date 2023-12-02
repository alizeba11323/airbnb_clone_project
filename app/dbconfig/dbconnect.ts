import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("DB Connected...");
  } catch (err) {
    console.log("DB Connection Failed!", err);
    process.exit();
  }
};
export default dbConnect;
