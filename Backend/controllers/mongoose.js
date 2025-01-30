import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config();

let isConnected = false;


export const connectToDB = async()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URI) return console.log("MONGODB URL not found");
    if(isConnected) return console.log("Already connected to DB");

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Connected to DB");

    }
    catch(err)
    {
        if(err)console.log(err);
    }

}

