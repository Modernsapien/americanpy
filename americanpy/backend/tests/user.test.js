const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")
const bcrypt = require('bcrypt')


describe('user route', () => {

    beforeAll(async () => {
        await new Promise((r) => setTimeout(r, 1000));
    })

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
    let id = ""
    let id2 = ""

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
        id = response.body.id
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
        id2 = loginUser2.body.id
    })

    //Get one by id
    it("should get user by id", async() => {
        const response = await request(app)
            .get(`/users/user/${id}`)
            .set({"Authorization": token})
            .expect(200)

        expect(response.body.username).toBe(username)
        user_id = response.body.user_id
    })

    //Get one by id error
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/users/user/700`)
            .set({"Authorization": token})
            .expect(404)
        expect(response.body.Error).toBe('unable to find user with this id')
    })

    //Get one by username errors
    //Wrong username
    it("should return wrong username error", async () => {
        const wrongUser = {
            username: "beesechurger",
            password: "deez"
        }
        const response = await request(app)
            .post(`/users/login`)
            .send(wrongUser)
            .expect(403)
        
        expect(response.body.Error).toBe("User with this username does not exist.")
    })

    //Quick auth tests
    //null
    it("does not like null", async () => {
        const response = await request(app)
            .get(`/users/user`)
            .set({"Authorization": null})
            .expect(403)
        expect(response.body.error).toBe('User not authenticated.')
    })

    //bad token
    it("does not like bad tokens", async () => {
        const response = await request(app)
            .get(`/users/user`)
            .set({"Authorization": "cheeseburger"})
            .expect(403)
        expect(response.body.error).toBe('Unable to find token.')
    })

    //Carbon points tests
    //Get carbon points
    it("should get the user's carbon points", async () => {
        const response = await request(app)
            .get(`/users/carbon/${id}`)
            .set({"authorization": token})
            .expect(200) 
        expect(response.body.carbon_points).toBe(0)
    })

    //Get carbon points error
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/users/carbon/700`)
            .set({"authorization": token})
            .expect(500)
        expect(response.body.Error).toBe("unable to find this user's carbon points")
    })

    //add carbon points
    it("should add carbon points", async () => {
        const points = {
            points: 800
        }

        const response = await request(app)
            .patch(`/users/carbon/add/${id}`)
            .set({"authorization": token})
            .send(points)
            .expect(200) 
        expect(response.body.carbon_points).toBe(800)
    })

    //add carbon points error bad user
    it("should return an error", async () => {
        const points = {
            points: 800
        }

        const response = await request(app)
            .patch(`/users/carbon/add/700`)
            .set({"authorization": token})
            .send(points)
            .expect(500) 
        expect(response.body.Error).toBe('unable to find user with this id')
    })

    //add carbon points error bad points
    it("should return an error", async () => {
        const points = {
            points: "definitely points"
        }

        const response = await request(app)
            .patch(`/users/carbon/add/${id}`)
            .set({"authorization": token})
            .send(points)
            .expect(500) 

        expect(response.body.Error).toBe('unable to update points')
    })

    //subtract carbon points
    it("should subtract carbon points", async () => {
        const points = {
            points: 600
        }

        const response = await request(app)
            .patch(`/users/carbon/subtract/${id}`)
            .set({"authorization": token})
            .send(points)
            .expect(200)
        expect(response.body.carbon_points).toBe(200)
    })

    //try to subtract too many carbon points
    it("should return an error and not take points", async () => {
        const points = {
            points: 600
        }

        const response = await request(app)
            .patch(`/users/carbon/subtract/${id}`)
            .set({"authorization": token})
            .send(points)
            .expect(500)
        expect(response.body.Error).toBe('User cannot have negative points')

        const response2 = await request(app)
            .get(`/users/carbon/${id}`)
            .set({"authorization": token})
            .expect(200) 
        expect(response2.body.carbon_points).toBe(200)
    })

    //Subtract carbon points but bad points
    it("should return an error", async () => {
        const points = {
            points: "hmmm yes points"
        }

        const response = await request(app)
            .patch(`/users/carbon/subtract/${id}`)
            .set({"authorization": token})
            .send(points)
            .expect(500)
        expect(response.body.Error).toBe('unable to update points')
    })

    //Profile picture
    //Try to update profile picture
    it("should update profile picture", async () => {
        const picture = {
            url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fworld-us-canada-37493165&psig=AOvVaw1qLAzrH7sYuT_Qb0ttUdXn&ust=1691680928301000&source=images&cd=vfe&opi=89978449&ved=0CA0QjRxqFwoTCPj56Njwz4ADFQAAAAAdAAAAABAD"
        }
        const response = await request(app)
            .patch(`/users/picture/${id}`)
            .set({"authorization": token})
            .send(picture)
            .expect(200)
        expect(response.body.profile_image_url).toBe(picture.url)
    })

    //Profile picture error
    it("should return an error", async () => {
        const picture = {
            url: 'alfjsdalfkjsadlfkjsadfl;ksajdflksajdf;lsakdjfl;sakdfjsa;ldkffaskldfjasdl;fjasld;fkjasdl;fkjasdf;lkasjdf;lsakjdf;laskdfj;lsakdjf;laskdjfas;ldkfjas;ldfkjas;dlfkjad;lfkjasd;lfkjasd;flkasjdf;lkasjdf;ldsakdjf;lsakfj;saldkfjsa;ldkfjas;ldfkjas;ldfkjsad;lfkjasd;lfkjasd;lfkjasd;lfkjasd;lfkjasd;lfkjsadf;lkasjdf;lsakjdf;lasdkjfas;ldkfjas;ldkfjasd;lfkjasd;lfkjasd;flkasjdf;laskdjfas;ldfkjas;ldfkjasd;lfkjd;lfkjasd;lfkjasd;lfkjasdf;laksjdf;aslkdfjas;ldfkjasd;lfkjasf;ldskjf;alskjdfjasl;dkfjas;ldfkjsaldfkjas;ldkfjasl;dkfjs;dlfkjasdl;fkjsad;lfkasjfl;kasdjfl;sakdfjasl;dkfjasl;dfkjsdl;fkjasdl;fkjsadfl;ksdjfl;askdjfl;sadkfjas;ldkfjas;ldfkjsal;dfkjsd;lfkasjdfl;sakdjfsal;dkfjsad;lfkjsafl;skdjf;lsakdfjas;ldfkjsa;ldfkjsadlfkjasf;laskjdf'
        }
        const response = await request(app)
            .patch(`/users/picture/${id}`)
            .set({"authorization": token})
            .send(picture)
            .expect(500)
        expect(response.body.Error).toBe('unable to update picture')
    })

    //Countries
    //Get all countries but no countries
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/users/country/${id}`)
            .set({"authorization": token})
            .expect(404)
        expect(response.body.Error).toBe('No countries visited!')
    })

    //Add a country
    it("should add a country", async () => {
        let country = {
            country_id:1
        }
        check = { users_countries_id: 1, user_id: 1, country_id: 1 }
        const response = await request(app)
            .patch(`/users/country/${id}`)
            .set({"authorization": token})
            .send(country)
            .expect(200)
        expect(response.body).toMatchObject(check)
    })

    //Get all but good
    it("should get all countries", async () => {
        let country = {
            country_id:2
        }
        let countries = [
            {
              country_id: 2,
              name: 'France',
              description: 'terrible place',
              eco_stat: 1,
              image_url: 'https://panamarbakery.com/public/Image/2021/3/12951_1baguettetradicionmasamadre280gcopia_Galeria.png',
              attractions: [ 'Eiffel Tower', 'Leave' ],
              users_countries_id: 2,
              user_id: 1
            },
            {
              country_id: 1,
              name: 'Zimbabwe',
              description: 'country in Africa',
              eco_stat: 9,
              image_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg',
              attractions: [ 'Victoria falls', 'Hwange National Park' ],
              users_countries_id: 1,
              user_id: 1
            }
          ]
        const addAnother = await request(app)
            .patch(`/users/country/${id}`)
            .set({"authorization": token})
            .send(country)
            .expect(200)

        const response = await request(app)
            .get(`/users/country/${id}`)
            .set({"authorization": token})
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body).toMatchObject(countries)
    })

    //Subtract country
    it("should take away a country", async () => {
        let country = {
            country_id:1
        }
        const response = await request(app)
            .delete(`/users/country/${id}`)
            .set({"authorization": token})
            .send(country)
            .expect(200)
        expect(response.body.message).toBe('Country removed from user')
    })

    //add a country error
    it("should return an error", async () => {
        let country = {
            country_id:700
        }
        const response = await request(app)
            .patch(`/users/country/${id}`)
            .set({"authorization": token})
            .send(country)
            .expect(500)
        expect(response.body.Error).toBe('Unable to add country')
    })

    //subtract a country error
    it("should return an error", async () => {
        let country = {
            country_id:700
        }
        const response = await request(app)
            .delete(`/users/country/${id}`)
            .set({"authorization": token})
            .send(country)
            .expect(500)
        expect(response.body.Error).toBe('Unable to remove country')
    })


    //Logout
    it("should logout the user", async () => {
        const response = await request(app)
            .delete(`/users/logout`)
            .set({"authorization": token})
            .expect(202)
        expect(response.body.message).toBe('Token deleted.')
    })

    //Logout error no token
    it("should return an error", async () => {
        const response = await request(app)
            .delete(`/users/logout`)
            .expect(500)
        expect(response.body.error).toBe('User not logged in!')
    })

    //Delete user
    it("should delete the user", async () => {
        const user1 = {
            username: username,
            password: "test"
        }
        const user2 = {
            username: "test2",
            password: "test2"
        }

        const loginUser1 = await request(app)
            .post("/users/login")
            .send(user1)
            .expect(200)
        token = loginUser1.body.token
        const response = await request(app)
            .delete(`/users/delete/${id}`)
            .set({"Authorization": token})
            .expect(204)

        const checkDelUser = await request(app)
            .get("/users")
            .expect(200)
        expect(checkDelUser.body.length).toBe(1)
        expect(checkDelUser.body[0].username).toBe(user2.username)  
    })

    //delete user error
    it("should return an error", async () => {
        const response2 = await request(app)
            .delete(`/users/delete/700`)
            .set({"Authorization": token2})
            .expect(403)
        expect(response2.body.Error).toBe('unable to find user with this id' )
    })

})