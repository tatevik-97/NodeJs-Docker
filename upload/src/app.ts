import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {ConsoleTransport, createLoggerMiddleware, Logger} from "@voskan/context-aware-logger";
import {NotFoundError, errorHandler} from "@tatev-97/common";
import {uploadRouter} from "./routes/upload";



const app = express();

const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(json());
app.use(express.static("uploads"));
app.use(createLoggerMiddleware(logger));
app.use(uploadRouter)

app.all("*", async () => {
    console.log('Upload')

    throw new NotFoundError()
});

app.use(errorHandler);

export {app, logger}
