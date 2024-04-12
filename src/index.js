import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Listening on port ${port}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed");
})