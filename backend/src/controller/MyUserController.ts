import { Request,Response } from "express";
import User from "../models/User";

const createCurrentUser = async(req:Request,res:Response)=>{
    // check if the user exists
    try {
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id});
        // create the user if it doesn't exist
        if(existingUser){
            return res.status(200).send();
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error creating user"});
    }
    // return the user object returning the call
}

export default{
    createCurrentUser,
}