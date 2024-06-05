const cors = require('cors')
const express = require("express")
const app = express()
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "sistema"
    }
})
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({
    origin: '*', 
}))


app.get("/ocorrencias", (req,res) => {
    knex("ocorrencias").then((dados) =>{
    res.send(dados)
    })
})

app.get("/ocorrenciasUsuario", (req,res) => {
    knex("ocorrencias").where({usuario: req.query.usuario}).then((dados) =>{
    res.send(dados)
    })
})

app.get("/ocorrenciasTipo", (req,res) => {
    knex("ocorrencias").where({tipo: req.query.tipo}).then((dados) =>{
    res.send(dados)
    })
})

app.post("/cadastrar", (req, res) => {
    knex("ocorrencias").insert({
      "usuario": 1,
      "titulo": req.body.titulo, 
      "descricao": req.body.descricao, 
      "tipo": req.body.tipo, 
      "latitude": req.body.latitude, 
      "longitude": req.body.longitude, 
      "dataHora": req.body.dataHora,
      "statusAndamento": "aberto"
    }).then((dados) => {
        res.send("Ocorrência cadastrada")
    })
})


app.put("/attOcorrencia", (req,res) => {
    knex("ocorrencias")
    .where({id:req.body.id})
    .update({
        statusAndamento: req.body.status,
        observacao: req.body.observacao
    }).then((dados) => {
        res.send("Ocorrência atualizada")
    })
})


app.delete("/deletar", (req,res) => {
    knex("ocorrencias").where({id: req.body.id}).delete().then(() => {
        res.send("Ocorrência deletada")
    })
})

app.listen(8081, () => {
    console.log("Servidor rodando na porta 8081")
})