import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Database connected with host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error while connecting to database: ", error);
    }
}

export default connectDB;