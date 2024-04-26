import express from 'express'
import {currentUser, validateRequest} from "@tatev-97/common";
import {validateNewPost} from "../validate";
import { Request, Response} from "express";
import {Post} from "../models/post";

const router = express.Router()

router.put("/api/posts/:id",
    currentUser,validateNewPost, validateRequest,
    async (req:Request,res:Response)=>{
try{
    const {title, content} = req.body;

    const updatedPost = await Post.findOneAndUpdate(
         { _id: req.params.id },
         { $set: { title, content } },
         { new: true }
    );
      res.status(200).send(updatedPost)
}catch(err){
    throw err
}
})


export {router as updatePostRouters}
