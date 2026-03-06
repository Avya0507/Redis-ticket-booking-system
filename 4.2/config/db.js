import mongoose from "mongoose"

export const connectDB=async()=> {
    try {
        await mongoose.connect("mongodb+srv://junejav12_db_user:05JUL2006@cluster1.44ap8tx.mongodb.net/?appName=Cluster1");
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connectionfailed:" ,error.message);
        process.exit(1);

    }
};