const Reward = require('../models/Reward')

class RewardController {
    static async getAllRewards(req, res) {
        try {
            const reward = await Reward.getAllRewards()
            res.status(200).send(reward)
        } catch (err) {
             res.status(404).json({Error: err.message})
        }
      }
      
    static async getRewardByID(req, res) {
      const { id } = req.params;
      try {
          const reward = await Reward.getRewardByID(id)
          if (reward.points_required) {
              res.status(200).json(reward);
          }else {
              res.status(404).json({ error: `Reward not found` });
          }
      }catch(err) {
          res.status(500).json({ error: `Oops something went wrong - ${err}` });
      }
    }

    static async getRewardsByPoints(req, res) {
      const points_required = parseInt(req.params.points_required);
      //console.log(points_required);
      try {
        const rewards = await Reward.getRewardsByPoints(points_required);
        res.status(200).json(rewards);
      } catch (err) {
        res.status(404).json({ error: err.message });
      }
    }

    static async createReward(req, res) {
      const reward = req.body;
      try {
        const newReward = await Reward.createReward(reward);
        //console.log(newReward);
        res.status(201).json(newReward);
      } catch (error) {
        res.status(500).json({ Error: `Error - ${error}` });
      }
    }
      
    static async updatePointsRequired(req, res) {
        try {
            const data = req.body;
            const rewardId = parseInt(req.params.id);
            const reward = await Reward.getRewardByID(rewardId);
            const updatedReward = await reward.updatePointsRequired(data);
            res.status(200).json(updatedReward);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    
    static async deleteReward(req, res) {
        const id = parseInt(req.params.id); 
        try {
            const result = await Reward.deleteReward(id); 
            res.status(204).json(result); 
        } catch (error) {
            res.status(404).json({ "error": error.message });
        }
    }
}

module.exports = RewardController

