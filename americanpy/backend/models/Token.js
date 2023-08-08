const { v4: uuidv4 } = require("uuid")

const db = require("../database/connect")

class Token {
    constructor({ token_id, user_id, token }) {
        this.token_id = token_id
        this.user_id = user_id
        this.token = String(token)
    }

    static async create(user_id) {
        const token = uuidv4()
        const response = await db.query(
            `INSERT INTO tokens (user_id, token)
            VALUES ($1, $2)
            RETURNING token_id`,
            [user_id, token]
        )
        const newID = response.rows[0].token_id
        const newToken = await Token.getOneById(newID)
        return newToken
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM tokens WHERE token_id = $1", [id]
        )
        return new Token(response.rows[0])
    }

    static async getOneByToken(token) {
        const response = await db.query(
            "SELECT * FROM tokens WHERE token = $1", [token]
        )
        if (response.rows.length != 1) {
            throw new Error("Unable to find token.")
        } else {
            return new Token(response.rows[0])
        }
    }

    async deleteToken() {
        await db.query("DELETE FROM tokens WHERE token = $1", [this.token])
        return "Token deleted."
    }
}

module.exports = Token