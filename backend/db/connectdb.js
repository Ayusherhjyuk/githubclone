import mongoose from "mongoose";

export default async function connectmongodb(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    } catch (error) {
        console.log("error connecting to mongodb:", error.message);
    }
}