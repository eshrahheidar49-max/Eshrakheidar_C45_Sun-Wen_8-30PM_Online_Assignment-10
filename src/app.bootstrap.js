import express from "express";
import chechConnectionDb from "./DB/connectionDB.js";
import userRouter from "./DB/modules/user.controller.js";
const app = express();

const port = 3000;

const bootstrap = () => {
  
  app.use(express.json()); // handle coming data in buffer formate

  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome on my App.....❤" });
  });
  chechConnectionDb();
  app.use("/user",userRouter)

  app.use("{/*dumy}", (req, res, next) => {
    next(new Error("URL " + req.originalUrl + " is not found....😢 ",{cause:404}))
    // res
    //   .status(404)
    //   .json({ message: "URL " + req.originalUrl + " is not found....😢 " });
  });
  //Error Handling
  app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.cause || 500).json({message:err.message
    ,stack :err.stack
    })
    
  })
  app.listen(port, () => {
    console.log("Saraha app works on port " + port);
  });
};
export default bootstrap;
