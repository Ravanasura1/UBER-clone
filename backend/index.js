import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser())

const PORT = process.env.PORT

app.use("/user",userRouter);
app.use("/captain",captainRouter)

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
  connectDB()
})