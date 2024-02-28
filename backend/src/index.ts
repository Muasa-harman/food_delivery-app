import express,{Request,Response} from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import path from 'path';
import { v2 as cloudinary } from "cloudinary";


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("db coonected successfully")
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary configured successfully.");


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const port = process.env.PORT;

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

// /api/my/user
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute)

app.get("/health", async (req:Request, res:Response) =>{
    res.send({message: "OK!"});
});

app.get("*", (req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"))
})

app.listen(3001, ()=>{
    console.log(`server started on port${port}` )
})