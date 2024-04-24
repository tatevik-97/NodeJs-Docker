import request from "supertest";
import { app } from "../../app";
import {Post} from "../../models/post";
import jwt from "jsonwebtoken";

it("has a route handler listening to /api/posts/:id for get request", async () => {
    const response = await request(app).get("/api/posts/:id").send({});

    expect(response.status).not.toEqual(404);
});
