import express from "express";
import { connectDB } from "./db/connectDB.js";
import "dotenv/config";
import cors from "cors";
import mouRoutes from "./routes/mou.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

//localhost-5000 =>backend,frontend
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
const __dirname=path.resolve()
app.use("/api/mous", mouRoutes);
app.use("/api/users", userRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/client/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
  })
}
app.listen(process.env.PORT, () => {
  console.log("Server running on the port",process.env.PORT);
  connectDB();
});
