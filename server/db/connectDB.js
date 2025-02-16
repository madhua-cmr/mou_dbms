import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()
export const connectDB=async()=>{

    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(conn.connection.host);

    } catch (error) {
        console.log(error.message);
        
    }


}