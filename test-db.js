import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let uri = (process.env.MONGO_URI || "mongodb+srv://haripreetham789:Mytask123v@firstcluster.rnycqqq.mongodb.net/?appName=Firstcluster").trim().replace(/^["'](.+)["']$/, '$1');

console.log("Attempting to connect to MongoDB...");
console.log("URI (masked):", uri.replace(/:([^@]+)@/, ":****@"));

try {
    await mongoose.connect(uri);
    console.log("✅ Success! The credentials are correct.");
    process.exit(0);
} catch (error) {
    console.error("❌ Connection failed!");
    console.error("Error Message:", error.message);
    process.exit(1);
}
