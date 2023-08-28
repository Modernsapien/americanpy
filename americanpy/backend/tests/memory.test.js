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

        await new Promise((r) => setTimeout(r, 10000));
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

    }, 20000)

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

    //Get user memories but no user memories
    it("should give an error that there are no memories", async () => {
        const response = await request(app)
            .get(`/memory/user/${id}`)
            .expect(404)
        expect(response.body.Error).toBe('User has no memories')
    })

    //Create
    it("should create a memory", async () => {
        const memory = {
            user_id: id,
            country: "France",
            memory_name: "I rember",
            memory_date: "yes",
            memory_description: "I forgor",
            memory_location: "test",
            drive_link: "i promise this is a link i swear"
        }

        const checkMemory = {
            user_id: id,
            country_id: 2,
            memory_name: "I rember",
            memory_date: "yes",
            memory_description: "I forgor",
            memory_location: "test",
            drive_link: "i promise this is a link i swear"
        }
        const response = await request(app)
            .post(`/memory/`)
            .send(memory)
            .expect(201)
        console.log(response.body)
        expect(response.body).toMatchObject(checkMemory)
    })

    //Get all but good
    it("should get all memories of all users", async () => {
        const memory = {
            user_id: id2,
            country: "Zimbabwe",
            memory_name: "I forgor",
            memory_date: "no",
            memory_location: "test",
            memory_description: "I rember",
            drive_link: "http://1227.com"
        }

        const checkMemory = {
            user_id: id2,
            country_id: 1,
            memory_name: "I forgor",
            memory_date: "no",
            memory_location: "test",
            memory_description: "I rember",
            drive_link: "http://1227.com"
        }

        const createAnotherMemory = await request(app)
            .post(`/memory/`)
            .send(memory)
            .expect(201)
        
        const response = await request(app)
            .get(`/memory/`)
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[1]).toMatchObject(checkMemory)
        
    })

    //Get one by id
    it("should get a memory by id", async () => {
        const memory = {
            user_id: id,
            country_id: 2,
            memory_name: "I rember",
            memory_description: "I forgor",
            memory_location: "test",
            drive_link: "i promise this is a link i swear"
        }
        const response = await request(app)
            .get(`/memory/memory/1`)
            .expect(200)
        expect(response.body).toMatchObject(memory)
    })

    //Get one by id error
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/memory/memory/40`)
            .expect(404)
        expect(response.body.Error).toBe('Memory does not exist.')
    })

    //Get one by name
    it("should get a memory by name", async () => {
        const memory = {
            user_id: id,
            country_id: 2,
            memory_name: "I rember",
            memory_description: "I forgor",
            memory_location: "test",
            drive_link: "i promise this is a link i swear"
        }
        const response = await request(app)
            .get(`/memory/name/${memory.memory_name}`)
            .expect(200)
        expect(response.body).toMatchObject(memory)
    })

    //Get one by name error
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/memory/name/IEatBean`)
            .expect(404)
        expect(response.body.error).toBe('Memory does not exist.')
    })

    //Get user memories
    it("should get all a user's memories by id", async () => {
        const memory = {
            user_id: id,
            country: "France",
            memory_name: "deported i was",
            memory_description: "arrested for tax evasion i have been",
            memory_location: "test",
            drive_link: "oh no"
        }
        const memoryCheck = {
            memory_id: 3,
            user_id: id,
            country_id: 2,
            memory_name: "deported i was",
            memory_description: "arrested for tax evasion i have been",
            memory_location: "test",
            drive_link: "oh no"
        }
        const addOneMore = await request(app)
            .post(`/memory/`)
            .send(memory)
            .expect(201)

        const response = await request(app)
            .get(`/memory/user/${memory.user_id}`)
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[1]).toMatchObject(memoryCheck)
    })

    //Get user memories error
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/memory/user/cheese`)
            .expect(404)
        expect(response.body.Error).toBe('unable to get memories')
    })

    //Update memory
    it("should update a memory", async () => {
        const memoryUpdate = {
            country_id: 1,
            memory_name: "cheese",
            memory_date: "frank",
            memory_description: "burger",
            memory_location: "test",
            drive_link: "beans"
        }
        const checkMemory = {
            memory_id: 1,
            user_id: 4,
            country_id: 1,
            memory_name: 'cheese',
            memory_date: "frank",
            memory_description: 'burger',
            memory_location: "test",
            drive_link: 'beans'
        }
        const memory = {
            user_id: id,
            country_id: 2,
            memory_name: "I rember",
            memory_date: "yes",
            memory_location: "test",
            memory_description: "I forgor",
            drive_link: "i promise this is a link i swear"
        }
        const response1 = await request(app)
            .get(`/memory/memory/1`)
            .expect(200)
        expect(response1.body).toMatchObject(memory)
        const response2 = await request(app)
            .patch(`/memory/1`)
            .send(memoryUpdate)
            .expect(200)
        expect(response2.body).toMatchObject(checkMemory)
        const response3 = await request(app)
            .get(`/memory/memory/1`)
            .expect(200)
        expect(response3.body).toMatchObject(checkMemory)

    })

    //Update memory error
    it("should return an error", async () => {
        const memory = {
            country_id:"burger"
        }
        const response2 = await request(app)
            .patch(`/memory/1`)
            .send(memory)
            .expect(404)
        expect(response2.body.error).toBe('Unable to update memory!')
    })

    //Delete
    it("should delete a memory", async () => {
        const memory = {
            user_id: id2,
            country_id: 1,
            memory_name: "I forgor",
            memory_location: "test",
            memory_description: "I rember",
            drive_link: "http://1227.com"
        }
        const response = await request(app)
            .delete(`/memory/1`)
            .expect(204)
        const checkDel = await request(app)
            .get(`/memory`)
            .expect(200)
        expect(checkDel.body.length).toBe(2)
        expect(checkDel.body[0]).toMatchObject(memory)
        const response2 = await request(app)
        .delete(`/memory/2`)
        .expect(204)
    })

    //Delete a memory error
    it("should return an error", async () => {
        const response = await request(app)
            .delete(`/memory/700`)
            .expect(500)
        expect(response.body.error).toBe('Memory does not exist.')
    })

    //Create memory error no country
    it("should return a error", async () => {
        const trauma = {
            spooky: "oh no I have trauma"
        }
        const response = await request(app)
            .post(`/memory/`)
            .send(trauma)
            .expect(404)
        expect(response.body.error).toBe('Unable to locate country')
    })

    //Create memory error no memory
    it("should return an error", async () => {
        const trauma = {
            spooky: "oh no I have trauma",
            country: "Zimbabwe"
        }
        const response = await request(app)
            .post(`/memory/`)
            .send(trauma)
            .expect(404)
        expect(response.body.error).toBe('unable to create memory')
    })
})