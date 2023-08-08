describe("Jest Test", () => {
    it('Should work', () => {
        const result = 1 + 1
        expect(result).toBe(2)
    })
})


const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")

describe("base route", () => {
    let api

    beforeAll(async () => {
        api = app.listen(8080, () => {
            console.log("Test server running on port 8080")
        })
    })

    afterAll((done) => {
        db.end()
        api.close(done)
    })

    //base route
    it("should return base message", async () => {
        const response = await request(app)
            .get(`/`)
            .expect(200)
        expect(response.text).toBe("Welcome to the PythonlyFans App")
    })
})