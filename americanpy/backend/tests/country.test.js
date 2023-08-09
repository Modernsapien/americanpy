const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")

describe("country routes", () => {


    afterAll(() => {
        console.log("Stopping test server")
        db.end()
    })

    //Get All Error
    it("should get an error as there are no countries", async () => {
        const response = await request(app)
            .get("/country")
            .expect(404)
        expect(response.body.Error).toBe('Unable to find country')
    })

    //Get One By Id Errors
    it("should get an error from bad (non-numeric) id", async () => {
        const response = await request(app)
            .get("/country/cheese")
            .expect(404)
        expect(response.body.Error).toBe('invalid input syntax for type integer: "cheese"')
    })

    it("should get an error from bad numeric id", async () => {
        const response = await request(app)
            .get("/country/343")
            .expect(404)
        expect(response.body.Error).toBe('Unable to locate country')
    })

    //Update country errors
    it("should get an error from no country to update", async () => {
        const response = await request(app)
            .patch("/country/343")
            .expect(404)
        expect(response.body.error).toBe('Unable to locate country')
    })

})