const db = require('../database/connect')

class User {
    constructor({ user_id, username, password, first_name, last_name, email, profile_image_url, carbon_points}) {
        this.user_id = user_id
        this.username = username
        this.password = password
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.profile_image_url = profile_image_url
        this.carbon_points = carbon_points

    }

    static async getUsers() {
        const resp = await db.query("SELECT * FROM users")
        if (resp.rows.length == 0) {
            throw new Error('There are no users')
        } else {
            return resp.rows.map((u) => new User(u))
        }
    }

    static async getOneByUsername(username) {
        const resp = await db.query("SELECT * FROM users WHERE username = $1", [username])
        if (resp.rows.length === 0 ) {
            throw new Error ("User with this username does not exist.")
        } else {
            return new User(resp.rows[0])
        }
    }

    static async getOneById(id) {
        const resp = await db.query(
            "SELECT * FROM users WHERE user_id = $1", [id]
        )

        if(resp.rows[0]){
            return new User(resp.rows[0])
        } else {
            throw new Error("unable to find user with this id")
        }
        
    }

    static async createUser(data) {
        const { username, password, firstName, lastName, email } = data
        const resp = await db.query(
            `INSERT INTO users (username,password,first_name,last_name, email)
            VALUES ($1, $2,$3,$4, $5) RETURNING user_id`,[username,password,firstName,lastName, email]
        )
        const id = resp.rows[0].user_id
        const newUser = await User.getOneById(id)
        return newUser
    }

    static async getCarbonPoints(id) {
        const resp = await db.query("SELECT carbon_points FROM users WHERE user_id = $1;", [id])
        if(resp.rows[0]){
            return resp.rows[0]
        } else {
            throw new Error("unable to find this user's carbon points")
        }
    }

    async addCarbonPoints(data) {
        try {
            const resp = await db.query("UPDATE users SET carbon_points = $1 WHERE user_id = $2 RETURNING user_id, carbon_points;",
            [parseInt(this.carbon_points) + parseInt(data.points), this.user_id])
            return new User(resp.rows[0])
        } catch(err) {
            throw new Error("unable to update points")
        }
    }

    async subtractCarbonPoints(data) {
        if(this.carbon_points - data.points >=0 || Number.isNaN(parseInt(data.points))== true) {
            try {
                const resp = await db.query("UPDATE users SET carbon_points = $1 WHERE user_id = $2 RETURNING user_id, carbon_points;",
                [parseInt(this.carbon_points) - parseInt(data.points), this.user_id])
                return new User(resp.rows[0])
            } catch(err) {
                throw new Error("unable to update points")
            }
        } else {
            throw new Error("User cannot have negative points")
        }
        
    }

    async updateProfilePicture(data) {
        try {
            const resp = await db.query("UPDATE users SET profile_image_url = $1 WHERE user_id = $2 RETURNING user_id, profile_image_url;",
            [data.url, this.user_id])
            return new User(resp.rows[0])
        } catch(err) {
            throw new Error("unable to update picture")
        }
    }

    static async getUsersCountries(id) {
        const resp = await db.query(
            "SELECT * FROM countries c LEFT JOIN users_countries u ON c.country_id = u.country_id WHERE u.user_id = $1;", [id]
        )
        if (resp.rows.length > 0){
            return resp.rows.map((p) => p)
        } else {
            throw new Error('No countries visited!')
        }
    }

    static async addCountry(user_id,country_id) {
        try {
            const resp = await db.query("INSERT INTO users_countries(country_id, user_id) VALUES ($1,$2) RETURNING *;",
            [country_id, user_id])
            return resp.rows[0]
        } catch(err) {
            throw new Error('Unable to add country')
        }
    }

    static async removeCountry(country_id,user_id) {
        const resp = await db.query("DELETE FROM users_countries WHERE country_id=$1 AND user_id=$2 RETURNING *;",[country_id,user_id])
        if (resp.rows.length > 0) {
            return 'Country removed from user'
        } else {
            throw new Error('Unable to remove country')
        }
        
    }

    async deleteUser() {
        const resp = await db.query("DELETE FROM users_countries WHERE user_id = $1",[this.user_id])
        const resp2 = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *",[this.user_id])
        return new User(resp2.rows[0])
    }

}

module.exports = User