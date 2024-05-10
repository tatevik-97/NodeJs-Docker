import express from 'express'
import {currentUser, validateRequest} from "@tatev-97/common";
import {checkFileType, validateNewPost} from "../validate";
import { Request, Response} from "express";
import {Upload} from "../models/upload";
import multer from "multer";
import path from "path";
import e from "express";

const router = express.Router()

const storage = multer.diskStorage({
    destination: "../uploads",
    filename(req, file, callback) {
        callback(null,file.fieldname+ "-",Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize: 1000000},
   fileFilter(req: e.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
     checkFileType(file,callback)}
}).single("image");



router.post("/api/posts/upload",
     (req:Request,res:Response)=>{
     upload(req,res,(err, result) => {
         if (err) {
             res.status(400).send({message: err}
             )
         } else {
             res.send({file: req.file})
         }
     })
    })

router.post("/api/posts",
    currentUser, validateNewPost, validateRequest,
    async (req:Request,res:Response)=>{
try{
    const {title, content} = req.body;
    const post = Upload.build({
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
