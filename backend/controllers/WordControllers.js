'user strict'

const { where } = require('sequelize');
const { Words } = require('../models')

let history = []

class WordController {

    static async WordFindOne(req, res) {

        try{

            
            const listwords = await Words.findAll() // Lista o número de palavras (objetos registrados no banco)
                    
            const activewords = await Words.findAll({ raw: true,attributes: ['word'] }) // Traz todas as palavras com modelos dentro do banco

            function random() {
                const list = activewords.map(wordObj => wordObj.word); // Tira os modelos e constroi um array com o valor das palavras

                const number = Math.floor(Math.random() * list.length); // Gera um número aleatório entre o número de palavras registradas

                const result = list[number]; // Pega uma palavra aleatória tendo do array "list" junto com o número aleatório do "number"

                if (!history.includes(result)) { // Garante que a nova palavra do "result" não seja repetida imediatamente

                    if (history.length >= 3) { // Verifica se tem um ou maiselementos no histórico "history"

                        history.shift(); // Caso tiver ele elimina o primeiro array
                    }
                    history.push(result); // Adiciona a nova palavra ao histórico "history"

                    return result; //retorna a nova palavra, que não está no histórico

                } else {

                    return random(); //chama a função random para gerar uma nova palavra caso necessário
                }
            }

            let choosenword = random()

            if(listwords,activewords){

                res.status(200).json(choosenword)

            }else{

                res.status(404).json("Nenhuma palavra encontrada")

            }

        }catch(error){

            res.status(400).json({error:true, message: error.message})
        }
       

      
    }

    static async WordFindAll(req, res) {

        try {

            const activewords = await Words.findAll()

            if (activewords) {

                res.status(200).json(activewords)

            } else {

                res.status(404).json("Nenhuma palavra cadastrada")

            }

        } catch (error) {

            res.status(400).json({ error: true, message: error.message })
        }
    }

    static async WordRegister(req, res) {

        try {

            const activewords = await Words.findOne({ where: { word: req.body.word } })

            if (activewords) {

                res.status(200).json("Palavra já cadastrada")

            } else {

                await Words.create({
                    word: req.body.word
                })
                res.status(404).json("Palavra cadastrada")

            }

        } catch (error) {

            res.status(400).json({ error: true, message: error.message })
        }
    }

    static async WordUpdate(req, res) {

        try {

            const activewords = await Words.findOne({ where: { word_id: req.body.word_id } })

            if (activewords) {

                await Words.update(

                    { word: req.body.word },
                    { where: { word_id: req.body.word_id } }
                )

                res.status(200).json("Palavra atualizada")

            } else {

                res.status(404).json("Nenhuma palavra encontrada")
            }

        } catch (error) {

            res.status(400).json({ error: true, message: error.message })
        }
    }

    static async WordDestroyer(req, res) {

        try {

            const activewords = await Words.findOne({ where: { word_id: req.body.word_id } })

            if (activewords) {

                await Words.destroy({
                    where: { word_id: req.body.word_id }
                })

                res.status(200).json("Palavra apagada")

            } else {

                res.status(404).json("Nenhuma palavra encontrada")
            }

        } catch (error) {

            res.status(400).json({ error: true, message: error.message })
        }
    }
}

module.exports = WordController;