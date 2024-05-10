import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {ConsoleTransport, createLoggerMiddleware, Logger} from "@voskan/context-aware-logger";
import {NotFoundError, errorHandler} from "@tatev-97/common";
import {createPostsRouters} from "./routes/new";
import {showPostRouter} from "./routes/show";
import {getAllPostsRouter} from "./routes/allPosts";
import {updatePostRouters} from "./routes/updatePosts";



const app = express();

const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(json());
app.use(express.static("uploads"));
app.use(createLoggerMiddleware(logger));
app.use(createPostsRouters)
app.use(showPostRouter)
app.use(getAllPostsRouter)
app.use(updatePostRouters)

app.all("*", async () => {
    console.log('Post')

    throw new NotFoundError()
});

app.use(errorHandler);

export {app, logger}
