import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to db -->");
  } catch (error) {
    console.log(error.message);
  }
};
