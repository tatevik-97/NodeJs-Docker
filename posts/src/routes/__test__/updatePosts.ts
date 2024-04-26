import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/posts/:id for post request", async () => {
    const response = await request(app).put("/api/posts").send({});

    expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
    await request(app).put("/api/posts/:id").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
        .put("/api/posts/:id")
        .set("Authorization", global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
    await request(app)
        .put("/api/posts/:id")
        .set("Authorization", global.signin())
        .send({
            title: "",
            content: "some content",
        })
        .expect(400);

    await request(app)
        .put("/api/posts/:id")
        .set("Authorization", global.signin())
        .send({
            content: "some content",
        })
        .expect(400);
});

it("returns an error if an invalid content is provided", async () => {
    await request(app)
        .put("/api/posts/:id")
        .set("Authorization", global.signin())
        .send({
            title: "some title",
            content: "",
        })
        .expect(400);

    await request(app)
        .put("/api/posts/:id")
        .set("Authorization", global.signin())
        .send({
            title: "some title",
        })
        .expect(400);
});
