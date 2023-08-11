const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")
const fs = require('fs');
const rewardSql = fs.readFileSync('/Users/Guy 1/Desktop/liskov/lap4/project4/americanpy/americanpy/backend/tests/mockDatabase/removeRewards.sql').toString();



describe("reward route", () => {


    afterAll(() => {
        console.log("Stopping test server")
        db.end()
    })

    let id 

    //Get all
    it("should get all rewards", async () => {
        const response = await request(app)
            .get(`/reward`)
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[0].name).toBe('reward1')
    })

    const reward = {
        reward_id: 2,
        name: 'reward2',
        description: 'reward2',
        points_required: 10
      }

    //Get one by id
    it("should get a reward by id", async () => {
        const response = await request(app)
            .get(`/reward/reward/2`)
            .expect(200)
        expect(response.body).toMatchObject(reward)
    })

    //Get one by id error
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/reward/reward/14000`)
            .expect(500)
        expect(response.body.error).toBe('Oops something went wrong - Error: Unable to locate reward')
    })

    //Get the dodgy one
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/reward/reward/4`)
            .expect(404)
        expect(response.body.error).toBe('Reward not found')
    })

    //Get one by points
    it("should get a reward by points", async () => {
        const response = await request(app)
            .get(`/reward/points/10`)
            .expect(200)
        expect(response.body.length).toBe(2)
        expect(response.body[1]).toMatchObject(reward)

        const response2 = await request(app)
            .get(`/reward/points/20`)
        expect(response2.body.length).toBe(3)
    })

    //Get one by points error
    it("should return an error", async () => {
        const response = await request(app)
            .get(`/reward/points/cheese`)
            .expect(404)
        expect(response.body.error).toBe('No rewards found for NaN points')
    })

    //Create
    it("should create a reward", async() => {
        let testReward = {
            name: 'test reward',
            description: 'test reward',
            points_required: 100
        }

        const response = await request(app)
            .post(`/reward`)
            .send(testReward)
            .expect(201)
        expect(response.body[0].name).toBe(testReward.name)
        expect(response.body[0].description).toBe(testReward.description)
        expect(response.body[0].points_required).toBe(testReward.points_required)
        id = response.body[0].reward_id

        const response2 = await request(app)
            .get(`/reward`)
            .expect(200)
        expect(response2.body.length).toBeGreaterThan(3)
    })

    //Create dumb reward
    it("should return an error", async () => {
        let testReward = {
            name: 'this is dumb',
            description: 'thats not a valid points required',
            points_required: 'cheese'
        }
        const response = await request(app)
            .post(`/reward`)
            .send(testReward)
            .expect(500)
        expect(response.body.Error).toBe('Error - Error: Failed to create reward')
    })

    //Update
    it("should update the points required", async () => {
        const points = {
            points_required:50
        }
        const response = await request(app)
            .patch(`/reward/${id}`)
            .send(points)
            .expect(200)
        expect(response.body.points_required).toBe(50)
    })

    //Update points error
    it("should fail to update points", async () => {
        let id2 = parseInt(id) + 1
        const points = {
            points_required:"cheese"
        }
        const response = await request(app)
            .patch(`/reward/${id}`)
            .send(points)
            .expect(404)
        expect(response.body.error).toBe('Unable to update points_required for reward')
    })

    //Delete
    it("should delete a reward by id", async () => {
        const response = await request(app)
            .delete(`/reward/${id}`)
            .expect(204)

        const response2 = await request(app)
            .get(`/reward/reward/${id}`)
            .expect(500)
        expect(response2.body.error).toBe('Oops something went wrong - Error: Unable to locate reward')
    })

    //Delete error
    it("should return an error", async () => {
        const response = await request(app)
            .delete(`/reward/cheese`)
            .expect(404)
        expect(response.body.error).toBe('failed to delete reward')
    })

    describe("tests with no rewards", () => {

        beforeAll(async() => {
            await db.query(rewardSql)
        })

        //Get all error
        it("should return an error", async () => {
            const response = await request(app)
                .get(`/reward`)
                .expect(404)
            expect(response.body.Error).toBe('no rewards found!')
        })
    })


})