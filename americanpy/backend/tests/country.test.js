const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")
const fs = require('fs');
const countrySql = fs.readFileSync('/Users/Guy 1/Desktop/liskov/lap4/project4/americanpy/americanpy/backend/tests/mockDatabase/addCountries.sql').toString();
const sql = fs.readFileSync('/Users/Guy 1/Desktop/liskov/lap4/project4/americanpy/americanpy/backend/tests/mockDatabase/setupMock.sql').toString();


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

    describe("country routes but there are actually countries", () => {

        beforeAll(async () => {
            await db.query(countrySql)
        })

        afterAll(async () => {
            await new Promise((r) => setTimeout(r, 20000));
            await db.query(sql)
        }, 40000)
        
        //Get all
        it("should get all countries", async () => {
            const response = await request(app)
                .get("/country")
                .expect(200)
            expect(response.body.length).toBeGreaterThan(1)
            expect(response.body[0].name).toBe('Zimbabwe')
        })

        //Get one by id
        it("should get one by id", async() => {
            const zimbabwe = {
                country_id: 1,
                name: 'Zimbabwe',
                eco_stat: 4,
                description: 'country in Africa',
                attractions: [ 'Victoria falls', 'Hwange National Park' ]
            }

            const response = await request(app)
                .get(`/country/1`)
                .expect(200)
            expect(response.body).toMatchObject(zimbabwe)
        })

        //Get one by country
        it("should get one by country", async () => {
            const zimbabwe = {
                country_id: 1,
                name: 'Zimbabwe',
                eco_stat: 4,
                description: 'country in Africa',
                attractions: [ 'Victoria falls', 'Hwange National Park' ]
            }

            const response = await request(app)
                .get(`/country/country/${zimbabwe.name}`)
                .expect(200)
            expect(response.body).toMatchObject(zimbabwe)
        })

        //Get one by country error
        it("should return an error", async () => {
            const response = await request(app)
                .get(`/country/country/burger`)
                .expect(404)
            expect(response.body.Error).toBe('Unable to locate country')
        })

        //Update one
        it("should update a country by id", async () => {
            const eco = {
                eco_stat: 9
            }
            const response = await request(app)
                .patch(`/country/1`)
                .send(eco)
                .expect(200)
            expect(response.body.eco_stat).toBe(eco.eco_stat)
        })

        //Update error with bad eco stat
        it("should return an error", async () => {
            const eco = {
                eco_stat: "cheese"
            }

            const response = await request(app)
                .patch(`/country/1`)
                .send(eco)
                .expect(404)
            expect(response.body.error).toBe('Unable to update country')
        })

         //Create a country
        it("should create a country", async () => {
            const country = {
                name: "Taiwan",
                eco_stat: 2,
                description: "yes definitely a country",
                image: "this is a url",
                attractions: ['Taipei', 'Definitely not being in China']
            }
            const countryCheck = {
                country_id: 3,
                name: 'Taiwan',
                eco_stat: 2,
                description: 'yes definitely a country',
                attractions: [ 'Taipei', 'Definitely not being in China' ]
              }
            const response = await request(app)
                .post(`/country`)
                .send(country)
                .expect(201)
            expect(response.body).toMatchObject(countryCheck)
        })

        //Create country error
        it("should return an error", async () => {
            const country = {
                stupidCountry: "this is stupid",
                eco_stat: "dumb"
            }
            const response = await request(app)
                .post(`/country`)
                .send(country)
                .expect(500)
            expect(response.body.error).toBe('Unable to create country')
        })

        //Delete a country
        it("should delete a country", async () => {
            const response = await request(app)
                .delete(`/country/3`)
                .expect(204)
            const checkDel = await request(app)
                .get("/country")
                .expect(200)
            expect(checkDel.body.length).toBe(2)
        })

        //Delete country error
        it("should return an error", async () => {
            const response = await request(app)
                .delete(`/country/700`)
                .expect(403)
            expect(response.body.error).toBe('Unable to locate country')
        })
    })

})