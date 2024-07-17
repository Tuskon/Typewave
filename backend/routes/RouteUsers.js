let express = require ('express');
const UserController = require('../controllers/UserController')
let router = express.Router();

router.get('/',(req,res)=>{
    res.send('Bem vindo a API de José Luiz Rodrigues dos Santos')
})

router.get('/users',(req,res)=>{
    res.send('Bem vindo a API de usuários de José Luiz Rodrigues dos Santos')
})

router.get('/users/FindOne',UserController.UserFindOne)

router.get('/users/FindAll',UserController.UserFindAll)

router.get('/users/FindPoints',UserController.UserFindPoints)

router.post('/users/UserRegister',UserController.UserRegister)

router.put('/users/UserUpdatePassword',UserController.UserUpdatePassword)

router.put('/users/UserUpdateName', UserController.UserUpdateName)

router.put('/users/UserUpdatePoints', UserController.UserUpdatePoints)

router.delete('/users/UserDestroyer',UserController.UserDestroyer)
module.exports= router;