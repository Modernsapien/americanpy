const bcrypt = require('bcrypt')
const User = require('../models/User')
const Token = require('../models/Token')

class UserController {
    static async register(req,res) {
        try {
            const data = req.body
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)

            const salt = await bcrypt.genSalt(rounds)
            data["password"] = await bcrypt.hash(data["password"], salt)

            const result = await User.createUser(data)
            res.status(201).send(result)
        } catch (err) {
            //console.log(err)
            res.status(500).json({ Error: err.message})
        }
    }

    static async login(req,res) {
        try {
            const data = req.body
            const user = await User.getOneByUsername(data.username)
            const authenticated = await bcrypt.compare(
                data.password,
                user["password"]
            )
            if(!authenticated) {
                throw new Error("Wrong username or password")
            } else {
                const token = await Token.create(user["user_id"])
                res.status(200).json({authenticated: true, token: token.token, id: user.user_id})
            }
        } catch (err) {
            res.status(403).json({Error: err.message})
        }
    }

    static async getUsers(req,res) {
        try {
            const users = await User.getUsers()
            res.status(200).json(users)
        } catch (err) {
            //console.log(err)
            res.status(404).json({Error: err.message})
        }
    }

    static async getUserById(req,res) {
        try {
            const user_id = parseInt(req.params.id)
            // let user_id = 1
            const user = await User.getOneById(user_id)
            delete user.password
            res.status(200).send(user)
        } catch (err) {
            //console.log(err)
            res.status(404).json({Error: err.message})
        }
    }

    static async getCarbonPoints(req,res) {
        try {
            const user_id = parseInt(req.params.id)
            const points = await User.getCarbonPoints(user_id)
            res.status(200).send(points)
        } catch(err) {
            res.status(500).json({Error: err.message})
        }
    }

    static async addCarbonPoints(req,res) {
        try {
            const user_id = parseInt(req.params.id)
            const user = await User.getOneById(user_id)
            const points = req.body
            const resp = await user.addCarbonPoints(points)
            res.status(200).send(resp)
        } catch (err) {
            res.status(500).json({"Error": err.message})
        }
    }

    static async subtractCarbonPoints(req,res) {
        try {
            const user_id = parseInt(req.params.id)
            const user = await User.getOneById(user_id)
            const points = req.body
            const resp = await user.subtractCarbonPoints(points)
            res.status(200).send(resp)
        } catch (err) {
            res.status(500).json({"Error": err.message})
        }
    }

    static async updateProfilePicture(req,res) {
        try {
            const user_id = parseInt(req.params.id)
            const user = await User.getOneById(user_id)
            const data = req.body
            const resp = await user.updateProfilePicture(data)
            res.status(200).send(resp)
        } catch(err) {
            res.status(500).json({Error: err.message})
        }
    }

    static async getUserCountries(req,res) {
        try {
            const user_id = parseInt(req.params.id)
            const resp = await User.getUsersCountries(user_id)
            res.status(200).send(resp)
        } catch(err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async addCountry(req,res) {
        try{
            const user_id = parseInt(req.params.id)
            const country_id = req.body.country_id
            const resp = await User.addCountry(user_id, country_id)
            res.status(200).send(resp)
        } catch(err) {
            res.status(500).json({Error: err.message})
        }
    }

    static async removeCountry(req,res) {
        try{
            const user_id = parseInt(req.params.id)
            const country_id = req.body.country_id
            const resp = await User.removeCountry(user_id, country_id)
            res.status(200).json({message :resp})
        } catch(err) {
            res.status(500).json({Error: err.message})
        }
    }

    static async logout(req, res) {
        try {
            const userToken = req.headers["authorization"];
            if (!userToken) {
                throw new Error('User not logged in!');
            } else {
                const token = await Token.getOneByToken(userToken)
                const response = await token.deleteToken();
                res.status(202).json({ message: response });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUser(req,res) {
        try {
            const user_id = parseInt(req.params.id)
            const tokenObj = req.tokenObj;
            const resp = await tokenObj.deleteToken();
            const user = await User.getOneById(user_id)
            const resp2 = await user.deleteUser(user_id)
            res.status(204).json(resp2);
        } catch (err) {
            res.status(403).json({ Error: err.message });
        }
    }

}

module.exports = UserController