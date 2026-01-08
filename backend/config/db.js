import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://visavadiyaastha5_db_user:chill123@cluster0.a5e5rgf.mongodb.net/ChillThrive')
    .then(() =>  console.log('DB CONNECTED'))
}