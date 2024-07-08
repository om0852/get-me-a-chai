import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    return mongoose.connect(`${process.env.DB_URL}`);
  };
  export default connectDB;
