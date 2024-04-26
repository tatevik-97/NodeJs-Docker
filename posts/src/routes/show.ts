import express from 'express'
import { NotFoundError} from "@tatev-97/common";
import { Request, Response} from "express";
import {Post} from "../models/post";

const router = express.Router()

router.get("/api/posts/:id",
    async (req:Request,res:Response)=>{
try{
     const post = await Post.findById(req.params.id)
     if(!post){
        throw new NotFoundError()
    }
     res.send(post)
}catch(err){
    throw err
}
})


export {router as showPostRouter}
