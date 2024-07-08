import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    return   await mongoose.connect(`${process.env.DB_URL}?retryWrites=true&w=majority&appName=CertificateGenerator`, {
      dbName: "chai",
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  };
  export default connectDB;
