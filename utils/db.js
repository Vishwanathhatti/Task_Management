import mongoose from "mongoose";
import "dotenv/config"
const connectDB =  async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDataBase successfully')
    } catch (error) {
        console.log('Error connecting MongoDB: ',error)
    }
};
export default connectDB;