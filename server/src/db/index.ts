import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  try {
    const dbConnectionString = `${process.env.MONGODB_URI}/${DB_NAME}`;
    console.log("mongodbURI", dbConnectionString);
    const connectionInstance = await mongoose.connect(dbConnectionString);
    console.log(
      `MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to database!!", error);
    process.exit(1);
  }
};

export default connectDB;
