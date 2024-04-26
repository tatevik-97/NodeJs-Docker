import express from 'express'
import {currentUser, validateRequest} from "@tatev-97/common";
import { Request, Response} from "express";
import {Post} from "../models/post";

const router = express.Router()

router.get("/api/posts",
    currentUser, validateRequest,
    async (req:Request,res:Response)=>{
try{
    const posts =await Post.find({})
    res.status(201).send(posts)
}catch(err){
    throw err
}
})


export {router as getAllPostsRouters}
