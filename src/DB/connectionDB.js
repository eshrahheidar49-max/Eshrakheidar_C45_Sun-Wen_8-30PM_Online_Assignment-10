import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";

const chechConnectionDb = async () => {
  await mongoose
    .connect(DB_URI, {
      serverSelectionTimeoutMS: 3000,
    })

    .then(() => {
      console.log('DB connect successfully With ..😘' +DB_URI);
    })
    .catch((error) => {
      console.log(error);
      
      console.log("DB connection failed...😢");
    });
};

export default chechConnectionDb;
