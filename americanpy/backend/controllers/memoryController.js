const Memory = require('../models/Memory')
const User = require('../models/User')
const Country = require('../models/Country')

class MemoryController {
    static async getAllMemories(req, res) {
        try {
            const memory = await Memory.getAllMemories()
            res.status(200).json(memory)
        } catch (err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async getOneById(req, res) {
        try {
            const { id } = req.params
            const memory = await Memory.getOneById(id)
            res.status(200).send(memory)
        } catch (err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async getOneByMemoryName(req, res) {
        try {
            const name = req.params.name
            const memory = await Memory.getOneByMemoryName(name);
            res.status(200).json(memory);
        } catch (err) {
            res.status(404).json({ error: err.message});
        }
    }

    static async getUserMemories(req, res) {
        try {
            const user_id = req.params.id
            const resp = await Memory.getUserMemories(user_id)
            res.status(200).send(resp)
        } catch (err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async createMemory(req, res) {
        try {
            const rawData = req.body;
            const country = await Country.getCountryByCountry(rawData.country)
            const user_id = rawData.user_id
            const memory_name = rawData.memory_name
            const memory_date = rawData.memory_date
            const memory_description = rawData.memory_description
            const memory_location = rawData.memory_location
            const country_id = country.country_id
            const drive_link = rawData.drive_link
            const data = { user_id, memory_date, memory_name, memory_description, country_id, memory_location, drive_link}
            const newMemory = await Memory.createMemory(data);
            res.status(201).json(newMemory)
        } catch (err) {
            res.status(404).json({error: err.message})
        }
    }

    static async deleteMemory(req, res) {
        try {
            const id = parseInt(req.params.id);
            const memory = await Memory.getOneById(id);
            const result = await memory.deleteMemory();
            res.status(204).end()
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    }


    static async updateMemory(req, res) {
        try {
            const id = parseInt(req.params.id);
            const data = req.body;
            const memory = await Memory.getOneById(id);
            const result = await memory.updateMemory(data);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).send({ error: err.message})
        }
    }

    


}

module.exports = MemoryController
