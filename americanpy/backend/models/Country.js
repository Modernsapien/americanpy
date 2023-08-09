const db = require('../database/connect')

class Country {
    constructor({country_id, name, eco_stat, description, image, attractions}){
        this.country_id = country_id;
        this.name = name;
        this.eco_stat = eco_stat;
        this.description = description;
        this.image = image;
        this.attractions = attractions
    }

    static async getAllCountry(){
        const resp = await db.query("SELECT * FROM countries")
        if (resp.rows.length === 0) {
            throw new Error("Unable to find country");
        }
        return resp.rows.map((country) => new Country(country))
    }

    static async getCountryByID(id){
        const resp = await db.query("SELECT * FROM countries WHERE country_id = $1", [id])
        if(resp.rows.length === 1){
            const country = new Country(resp.rows[0])
            return country
        } else {
            throw new Error("Unable to locate country")
        }
    }

    async updateCountry(data) {
        const resp = await db.query("UPDATE countries SET eco_stat =$1 WHERE country_id = $2 RETURNING eco_stat, country_id;", 
        [data.country_id,
        data.eco_stat]);
        if (response.ros.length != 1) {
            throw new Error("Unable to update country")
        }
        return new Country(response.rows[0])
    }

    

}

module.exports = Country
