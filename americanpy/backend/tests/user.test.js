const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")
const bcrypt = require('bcrypt')


describe('user route', () => {

    afterAll(() => {
        console.log("Stopping test server")
        db.end()
    })

    const newUser = {
        username: "test",
        password: "test",
        firstName: "cheese",
        lastName: "burger",
        email: "cheese.burger@chz.bur"
    }
    let token = ""
    let token2 = ""

    //Get users but no user
    it("should return error", async () => {
        const response = await request(app)
            .get("/users")
            .expect(404)

        expect(response.body.Error).toBe('There are no users')
    })

    //Register
    it("Should create a new user", async () => {
        const response = await request(app)
            .post("/users/register")
            .send(newUser)
            .expect(201)
        username = response.body.username
        password = response.body.password
        expect(username).toEqual(newUser.username)
        const samePassword = await bcrypt.compare(newUser.password, password)
        expect(samePassword).toEqual(true)
    })

    //Register repeat user
    it("Should give an error if user tries to register again with the same details", async () => {
        const response = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(500);
    
        let { Error } = response.body;
    
        expect(Error).toBe(`duplicate key value violates unique constraint \"users_username_key\"`);
      });

    //LOGIN
    it("should login the user", async () => {
        const user = {
            username: username,
            password: "test"
        }
        const response = await request(app)
            .post("/users/login")
            .send(user)
            .expect(200)
        
        token = response.body.token
        expect(token).toBeTruthy()
    })

    //login with wrong password
    it("should say wrong credentials", async () => {
        const user = {
            username: username,
            password: "balls"
        }
        const response = await request(app)
            .post("/users/login")
            .send(user)
            .expect(403)
        expect(response.body.Error).toBe('Wrong username or password')
    })

    //Get all users
    it("should get all users", async () => {
        const newUser2 = {
            username: "test2",
            password: "test2",
            firstName: "dragon",
            lastName: "deez",
            email:"dragon.deez@nu.ts"
        }
        const addAnother = await request(app)
            .post("/users/register")
            .send(newUser2)

        const response = await request(app)
            .get("/users")
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[1].username).toBe(newUser2.username)

        const loginUser2 = await request(app)
            .post("/users/login")
            .send(newUser2)
            .expect(200)
        token2 = loginUser2.body.token
    })

    //Logout
    it("should logout the user", async () => {
        const response = await request(app)
            .delete(`/users/logout`)
            .set({"authorization": token})
            .expect(202)
        expect(response.body.message).toBe('Token deleted.')
    })

    //Delete user
    // it("should delete the user", async () => {
    //     const user1 = {
    //         username: username,
    //         password: "test"
    //     }
    //     const user2 = {
    //         username: "test2",
    //         password: "test2"
    //     }

    //     const loginUser1 = await request(app)
    //         .post("/users/login")
    //         .send(user1)
    //         .expect(200)
    //     token = loginUser1.body.token
    //     const response = await request(app)
    //         .delete(`/users/delete/${id}`)
    //         .set({"Authorization": token})
    //         .expect(204)

    //     const checkDelUser = await request(app)
    //         .get("/users")
    //         .expect(200)
    //     expect(checkDelUser.body.length).toBe(1)
    //     expect(checkDelUser.body[0].username).toBe(user2.username)

    //     const response2 = await request(app)
    //         .delete(`/users/delete/${id2}`)
    //         .set({"Authorization": token2})
    //         .expect(204)  
        
    // })

})