import express from "express";
import { connectDB } from "./db/connectDB.js";
import "dotenv/config";
import cors from "cors";
import mouRoutes from "./routes/mou.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();

app.use(
  cors()
);

//localhost-5000 =>backend,frontend

app.use(express.json());
app.use(cookieParser());
app.use("/api/mous", mouRoutes);
app.use("/api/users", userRoutes);
const __dirname=path.resolve()
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
