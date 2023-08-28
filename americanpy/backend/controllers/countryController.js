const Country = require('../models/Country')
const countriesToAdd = require('../../client/data/ecoData.json')

class CountryController {

    static async getAllCountry(req, res) {
        try {
            const country = await Country.getAllCountry()
            res.status(200).send(country)
        } catch (err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async getCountryByID(req, res) {
        try {
            const { id } = req.params
            const country = await Country.getCountryByID(id)
            res.status(200).send(country)
        } catch (err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async getCountryByCountry(req, res) {
        try {
            const name = req.params.country
            const country = await Country.getCountryByCountry(name)
            res.status(200).send(country)
        } catch (err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async setUpCountries(req,res) {
        for(let i=0; i<countriesToAdd.length; i++){
            let name = countriesToAdd[i].country
            let description = countriesToAdd[i].description
            let data = { name, description}
            const result = await Country.createCountry(data)
        }
    }

    static async updateCountry(req, res) {
        try {
            const id = parseInt(req.params.id);
            const data = req.body;
            const country = await Country.getCountryByID(id);
            const result = await country.updateCountry(data);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).send({ error: err.message });
        }
    }

    static async createCountry(req, res) {
        try {
            const data = req.body;
            const newCountry = await Country.createCountry(data);
            res.status(201).json(newCountry)
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    static async deleteCountry(req, res) {
        try {
            const { id } = req.params
            const country = await Country.getCountryByID(id)
            const result = await country.deleteCountry();
            res.status(204).end();
        } catch (err) {
            res.status(403).json({error: err.message})
        }
    }
}

module.exports = CountryController
