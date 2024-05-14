import mongoose from "mongoose";
import {app, logger} from './app'

const start = async () => {
    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI must be defined")
    }
    if(!process.env.UPLOAD_PORT){
        throw new Error("UPLOAD_PORT must be defined")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        logger.info("Connected to Mongo");
    } catch (err) {
        throw err
    }
    app.listen(process.env.UPLOAD_PORT, () => {
        logger.info(`UPLOAD SERVICE: Listening on port ${process.env.UPLOAD_PORT}`);
    });
}

start()
