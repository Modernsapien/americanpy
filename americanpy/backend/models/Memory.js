const db = require('../database/connect')

class Memory {

    constructor({ memory_id, user_id, country_id, memory_name, memory_description, drive_link}) {
        this.memory_id = memory_id;
        this.user_id = user_id;
        this.country_id = country_id;
        this.memory_name = memory_name;
        this.memory_description = memory_description;
        this.drive_link = drive_link;
    }

    static async getAllMemories() {
        const resp = await db.query("SELECT * FROM memories") 
        if (resp.rows.length == 0) {
            throw new Error('There are no memories')
        } else {
            return resp.rows.map((m) => new Memory(m))
        }
    }

    static async getOneByMemoryName(memory_name) {
        const resp = await db.query("SELECT * FROM memories WHERE memory_name = $1", [memory_name])
        if (resp.rows.length == 0 ) {
            throw new Error ("Memory does not exist.")
        } else {
            return new Memory(resp.rows[0])
        }
    }

    static async getOneById(memory_id) {
        const resp = await db.query("SELECT * FROM memories WHERE memory_id = $1", [memory_id])
        if (resp.rows.length == 0 ) {
            throw new Error ("Memory does not exist.")
        } else {
            return new Memory(resp.rows[0])
        }
    }

    static async createMemory(data) {
        const { memory_name, memory_description, drive_link} = data
        const resp = await db.query(`INSERT INTO memories (memory_name, memory_description, drive_link) VALUES ($1, $2, $3) RETURNING memory_id`, [memory_name, memory_description, drive_link])

        const id = resp.rows[0].memory_id
        const newMemory = await Memory.getOneById(id)
        return newMemory
    }

    async deleteMemory() {
        const resp = await db.query("DELETE FROM memories WHERE memory_id = $1 RETURNING *;", [this.memory_id]);
        if (resp.rows.length != 1) {
            throw new Error("Unable to delete memory.")
        }
        return new Memory(resp.rows[0])
    }

    async updateMemory(data) {
        const resp = await db.query("UPDATE memories SET country_id =$1, memory_name =$2, memory_description = $3, drive_link = $4 WHERE memory_id = $5 RETURNING *;",
        [
            data.country_id,
            data.memory_name,
            data.memory_description,
            data.drive_link,
            this.memory_id
        ]);
        if (resp.rows.length != 1) {
            throw new Error("Unable to update memory!")
        }
        return new Memory(resp.rows[0]);
    }


}

module.exports = Memory
