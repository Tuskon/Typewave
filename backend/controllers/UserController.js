'user strict'

const { where } = require('sequelize');
const { Users } = require('../models')


class UserController {

    static async UserFindOne(req, res) {

        try {

            const { email, password } = req.query;

            const user = await Users.findOne({ where: { email, password }, attributes: ['username','email'] })

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json('Usuário não cadastrado')
            }


        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }


    }

    static async UserFindPoints(req, res) {

        try {

            const { email} = req.query;

            const user = await Users.findOne({ where: { email}, attributes: ['points'] })

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json('Usuário não cadastrado')
            }


        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }


    }

    static async UserFindAll(req, res) {

        try {

            const user = await Users.findAll({ attributes: ['user_id', 'username', 'email', 'password', 'points'] })

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json('Nenhum Usuário cadastrado')
            }


        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }

    static async UserRegister(req, res) {

        try {

            const activeuser = await Users.findOne({ where: { email: req.body.email } })

            if (activeuser) {
                res.status(404).json({ message: "Esse usuário já existe !" })
            } else {
                await Users.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
            }
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }


    static async UserUpdateName(req, res) {

        try {

            const activeuser = await Users.findOne({ where: { email: req.body.email } })

            if (activeuser) {

                await Users.update(
                    {username: req.body.username},
                    {where: {email:req.body.email}}
                )

                res.status(201).json({ message: 'Usuário Atualizado' })

            } else {
                res.status(404).json('Nenhum Usuário cadastrado')
            }

        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }

    static async UserUpdatePassword(req, res) {
        try {
            const activeuser = await Users.findOne({ where: { email: req.body.email } });
    
            if (activeuser) {
                await Users.update(
                    { password: req.body.password },
                    { where: { email: req.body.email } }
                );
                res.status(201).json({ message: 'Usuário Atualizado' });
            } else {
                res.status(404).json('Nenhum Usuário cadastrado');
            }
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }

    static async UserUpdatePoints(req, res) {
        try {

            const { email, points } = req.body;
            const activeuser = await Users.findOne({where:{email}});
    
            if (activeuser) {
                await Users.update(
                    { points: points },
                    { where: {email} }
                );
                res.status(201).json({ message: 'Usuário Atualizado' });
            } else {
                res.status(404).json('Nenhum Usuário cadastrado');
            }
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }

    static async UserDestroyer(req, res) {

        try {

            const activuser = await Users.findOne({ where: { email: req.body.email, password: req.body.password, username: req.body.username }})

            if (activuser) {
                await Users.destroy({where:{
                    email: req.body.email,
                    password: req.body.password,
                    username:  req.body.username
                }})
                res.status(201).json({ message: 'Usuário Removido' });
            } else {
                res.status(404).json('Usuário não cadastrado')
            }


        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }


    }
}

module.exports = UserController;