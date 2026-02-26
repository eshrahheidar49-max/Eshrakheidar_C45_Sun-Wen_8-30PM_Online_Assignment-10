import mongoose from "mongoose";

const chechConnectionDb = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/SarahaApp", {
      serverSelectionTimeoutMS: 3000,
    })

    .then(() => {
      console.log("DB connect successfully..😘");
    })
    .catch((error) => {
      console.log("DB connection failed...😢");
    });
};

export default chechConnectionDb;
