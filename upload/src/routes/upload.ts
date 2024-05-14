import {bucket} from "../services/fierbase";
import express from 'express'
import { Request, Response} from "express";
import multer from "multer";
import path from "path";
import e from "express";
import {checkFileType} from "../validate";

const router = express.Router()

const storage = multer.diskStorage({
    destination: "../uploads",
    filename(req, file, callback) {
        callback(null,file.fieldname+ "-",Date.now()+ path.extname(file.originalname))
    }
})

const uploadFirebase = multer({
    storage:multer.memoryStorage(),

});

///////
const upload = multer({
    storage:storage,
    limits:{fileSize: 1000000},
   fileFilter(req: e.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
     checkFileType(file,callback)}
}).single("image");



router.post("/api/upload",
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



router.post("/api/upload-firebase",uploadFirebase.single("file"),
    (req:Request,res:Response)=>{
            if (!req.file) res.status(400).send("No file")
            const blob = bucket.file(req.file?.originalname)
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype
                }
            })

            blobStream.on("error",(err)=>{
                res.status(500).send({message: err.message})

            })

            blobStream.on("finish",()=>{
                const publicUrl = `https://www.googleapis.com/${bucket.name}/${blob.name}`
                res.status(200).send({url: publicUrl})
            })

            blobStream.end(req.file?.buffer)
        })




export {router as uploadRouter}
