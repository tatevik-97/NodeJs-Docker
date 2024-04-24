import request from "supertest";
import { app } from "../../app";
import {Post} from "../../models/post";
import jwt from "jsonwebtoken";

it("has a route handler listening to /api/posts/:id for get request", async () => {
    const response = await request(app).get("/api/posts/:id").send({});

    expect(response.status).not.toEqual(404);
});

it("returns the post with the given ID if it exists", async () => {

    const post = await Post.create({ title: "Test Post", content: "Test Content", userId:"testId"});

    const response = await request(app).get(`/api/posts/${post.id}`).send();

    expect(response.status).not.toEqual(404);

    expect(response.body.title).toEqual("Test Post");
    expect(response.body.content).toEqual("Test Content");
});

