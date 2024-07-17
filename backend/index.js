const express = require ('express')
const cors = require('cors');
const RouteUsers = require ('./routes/RouteUsers')
const RouteWords = require ('./routes/RouteWords')
const app = express ()
const port = 8080

app.use(cors());
app.use(express.json());
app.use('/',RouteUsers)
app.use('/',RouteWords)

app.listen(port,() => {
    console.log(`O servidor está rodando na porta ${port}`)
})