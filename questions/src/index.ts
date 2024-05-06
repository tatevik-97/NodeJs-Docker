import mongoose from "mongoose";
import {app, logger} from './app'

const start = async () => {
    if(!process.env.MONGO_URI){ // Corrected the variable name here
        throw new Error("MONGO_URI must be defined")
    }
    if(!process.env.QUESTIONS_PORT){
        throw new Error("QUESTIONS_PORT must be defined")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI) // Removed the non-null assertion here, as the check above ensures it's defined
        logger.info("Connected to Mongo");
    } catch (err) {
        throw err
    }
    app.listen(process.env.QUESTIONS_PORT, () => {
        logger.info(`QUESTIONS_PORT SERVICE: Listening on port ${process.env.POSTS_PORT}`);
    });
}

start()
