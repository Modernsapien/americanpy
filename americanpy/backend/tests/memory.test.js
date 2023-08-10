const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")

describe("Memory route", () => {

    let id
    let id2
    let token
    let token2
    beforeAll(async () => {
        const newUser = {
            username: "memory man",
            password: "test",
            firstName: "meme",
            lastName: "ory",
            email: "i.rember@brain.cell"
        }

        const newUser2 = {
            username: "i forgor",
            password: "test",
            firstName: "al",
            lastName: "zheimer",
            email: "i.forgor@for.gor"
        }

        const user1 = {
            username: newUser.username,
            password: "test"
        }
        const user2 = {
            username: newUser2.username,
            password: "test"
        }

        await new Promise((r) => setTimeout(r, 3000));
        const response = await request(app)
            .post("/users/register")
            .send(newUser)
        id = response.body.user_id

        const loginUser1 = await request(app)
            .post("/users/login")
            .send(user1)
        token = loginUser1.body.token

        const response2 = await request(app)
            .post("/users/register")
            .send(newUser2)
        id2 = response2.body.user_id

        const loginUser2 = await request(app)
            .post("/users/login")
            .send(user2)
        token2 = loginUser2.body.token

    })

    afterAll(async () => {

        const response = await request(app)
            .delete(`/users/delete/${id}`)
            .set({"Authorization": token})

        const response2 = await request(app)
            .delete(`/users/delete/${id2}`)
            .set({"Authorization": token2})

        console.log("Stopping test server")
        db.end()
    })

    //Get all error
    it("should give an error that there are no memories", async () => {
        const response = await request(app)
            .get("/memory")
            .expect(404)
        expect(response.body.Error).toBe('There are no memories')
    })

    //Create
    it("should create a memory", async () => {
        const memory = {

        }
    })

})