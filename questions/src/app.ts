import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {router} from "./api/routes";
import {ConsoleTransport, createLoggerMiddleware, Logger} from "@voskan/context-aware-logger";
import {NotFoundError, errorHandler} from "@tatev-97/common";



const app = express();

const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(json());
app.use(createLoggerMiddleware(logger));
app.use(router);

app.all("*", async () => {
    console.log('Questions')
    throw new NotFoundError()
});

app.use(errorHandler);

export {app, logger}
