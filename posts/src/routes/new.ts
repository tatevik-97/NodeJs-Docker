import express from 'express'
import {currentUser, validateRequest} from "@tatev-97/common";
import {validateNewPost} from "../validate";
import { Request, Response} from "express";
import {Post} from "../models/post";

const router = express.Router()

router.post("/api/posts",
    currentUser, validateNewPost, validateRequest,
    async (req:Request,res:Response)=>{
try{
    const {title, content} = req.body;
    const post = Post.build({
        title,
        content,
        userId: req.currentUser!.id
    })
    await post.save()
    res.status(201).send(post)
}catch(err){
    throw err
}
})


export {router as createPostsRouters}
