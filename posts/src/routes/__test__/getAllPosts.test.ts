import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/posts for get request", async () => {
    const response = await request(app).get("/api/posts")
        .set("Authorization", global.signin()).send({});

    expect(response.status).not.toEqual(404);
});

it("returns an empty array if there are no posts", async () => {
    const response = await request(app).get("/api/posts").set("Authorization", global.signin()).send({});

    expect(response.status).toEqual(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toEqual(0);
});

