let express = require ('express');
const WordController = require('../controllers/WordControllers')
let router = express.Router();

router.get('/',(req,res)=>{
    res.send('Bem vindo a API de José Luiz Rodrigues dos Santos')
})

router.get('/words',(req,res)=>{
    res.send('Bem vindo a API de palavras de José Luiz Rodrigues dos Santos')
})

router.get('/words/WordFindOne',WordController.WordFindOne)

router.get('/words/WordFindAll',WordController.WordFindAll)

router.post('/words/WordRegister',WordController.WordRegister)

router.put('/words/WordUpdate',WordController.WordUpdate)

router.delete('/words/WordDestroyer',WordController.WordDestroyer)

module.exports= router;