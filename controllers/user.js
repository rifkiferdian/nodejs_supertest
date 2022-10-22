const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {

    static async loginUser(req, res) {
        try {
            const data = await User.findOne({
                where: {
                    username: req.body.username,
                },
            });

            if (!data) {
                res.status(400).json({
                    error: "username tidak ada",
                });
            } else {
                if (comparePassword(req.body.password, data.password)) {
                    const access_token = signToken({
                        id: data.id,
                        username: data.username,
                    });
                    res.status(200).json({ token : access_token });
                } else {
                    res.status(400).json({
                        error: "password salah",
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getDataUser(req, res){
        try {
            const data = await User.findAll();
            if (!data) {
                res.status(400).json({
                    error: "username tidak ada",
                });
            }else {
                res.json(data);
            }

        } catch (error) {
            res.status(500).json({message:error.message});
        }
        
    }

    static async registerUser(req, res){
        try {
            const InputUsers = await User.create(req.body);
            res.status(201).json(InputUsers);
        } catch (error) {
            res.status(500).json({error:error.errors[0].message});
        }
    }
}

module.exports = UserController;