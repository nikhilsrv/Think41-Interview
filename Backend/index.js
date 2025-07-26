import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import chatRoutes from "./routes/chatRoutes.js"

dotenv.config();


const app=express();
const PORT=process.env.PORT||5000

app.use(express.json());


app.use("/api/v1/chat",chatRoutes);




app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on ${PORT}`)
})