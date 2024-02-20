import express,{Request,Response} from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import myUserRoute from "./routes/MyUserRoute"
import path from 'path';


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("db coonected successfully")
});


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const port = process.env.PORT;

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

// /api/my/user
app.use("/api/my/user", myUserRoute);

app.get("/test", async (req:Request, res:Response) =>{
    res.json({message: "Hello!"});
});

app.get("*", (req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"))
})

app.listen(3001, ()=>{
    console.log(`server started on port${port}` )
})