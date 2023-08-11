const db = require('../database/connect')

class Reward {
    constructor({reward_id, name, description, points_required}){
        this.reward_id = reward_id;
        this.name = name;
        this.description = description;
        this.points_required = points_required;
    }

    static async getAllRewards(){
        const query = "SELECT * FROM rewards";
        const { rows } = await db.query(query);
        if(rows.length == 0){
            throw new Error("no rewards found!")
        }
        return rows;
    }

    static async getRewardByID(id){
        const resp = await db.query("SELECT * FROM rewards WHERE reward_id = $1", [id])
        if(resp.rows.length == 1){
            const reward = new Reward(resp.rows[0])
            return reward
        } else {
            throw new Error("Unable to locate reward")
        }
    }

    static async getRewardsByPoints(points_required){
        try {
            const query = "SELECT * FROM rewards WHERE points_required <= $1;"
            const { rows } = await db.query(query, [points_required]);
            return rows;
        } catch (err) {
            throw new Error(`No rewards found for ${points_required} points`)
        }
    }

    static async createReward(reward) {
        try {
            const { name, description, points_required } = reward;
            const query =
              "INSERT INTO rewards (name, description, points_required) VALUES ($1, $2, $3) RETURNING *";
            const values = [name, description, points_required];
            const { rows } = await db.query(query, values);
            return rows;
        } catch(err) {
            throw new Error("Failed to create reward")
        }
      }

    async updatePointsRequired(data) {
        const reward_id = this.reward_id;
        const points_required = data.points_required;
        try {
            const resp = await db.query("UPDATE rewards SET points_required = $1 WHERE reward_id = $2 RETURNING *;",
            [points_required, reward_id]
             );
            return resp.rows[0];
        } catch (err) {
            throw new Error("Unable to update points_required for reward");
        }
        
        
    }
    
     static async deleteReward(id) {
        try{
            const resp = await db.query("DELETE FROM rewards WHERE reward_id = $1 RETURNING *",[id])
            return resp.rows[0]
        } catch(err) {
            throw new Error("failed to delete reward")
        }
        
    }

}

module.exports = Reward