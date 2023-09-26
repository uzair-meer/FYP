import mongoose from "mongoose";
const connectDB = async (DATABASE_URI) => {
    try {
        const DB_OPTIONS = {
            dbName: 'company',
        }
        mongoose.set("strictQuery", true);
        await mongoose.connect(DATABASE_URI, DB_OPTIONS)
        console.log('connected successfuly...!')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB