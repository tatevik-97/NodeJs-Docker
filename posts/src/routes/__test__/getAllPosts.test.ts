import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/posts for get request", async () => {
    const response = await request(app).get("/api/posts").send({});

    expect(response.status).not.toEqual(404);
});

it("returns the posts", async () => {

    const response = await request(app).get(`/api/posts`).send();

    expect(response.status).not.toEqual(404);
});

