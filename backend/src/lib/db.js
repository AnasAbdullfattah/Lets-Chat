import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_URI);
    console.log("This is the DB running Sugooooooooi");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

