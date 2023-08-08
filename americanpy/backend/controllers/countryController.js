const Country = require('../models/Country')

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


}

module.exports = CountryController
