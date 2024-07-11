const cors = require('cors');
const express = require("express");
const app = express();
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "sistema",
        port: 3306  
    }
});
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

app.get("/ocorrenciasMapaCalor", (req,res) => {
    const now = new Date()
    const dia = now.getDate().toString().padStart(2, '0');
    const mes = (now.getMonth() + 1).toString().padStart(2, '0');
    const ano = now.getFullYear()

    const tipo = req.query.tipo
    const data = req.query.data
    let condicao

    if (tipo === "todos") {
        if (data === "dia") {
            const parametro = ano + "-" + mes + "-" + dia            
            condicao = 'DATE_FORMAT(dataHora, "%Y-%m-%d") = "'+parametro+'"'
        } else if (data === "mes") {
            const parametro = ano + "-" + mes
            condicao = 'DATE_FORMAT(dataHora, "%Y-%m") = "'+parametro+'"'
        } else if (data === "ano") {
            const parametro = ano
            condicao = 'DATE_FORMAT(dataHora, "%Y") = "'+parametro+'"'
        } else if (data === "geral"){
            condicao = 'id > 0'
        }
    } else {
        if (data === "dia") {
            const parametro = ano + "-" + mes + "-" + dia            
            condicao = 'DATE_FORMAT(dataHora, "%Y-%m-%d") = "'+parametro+'" and tipo = "' +tipo+ '"'
        } else if (data === "mes") {
            const parametro = ano + "-" + mes
            condicao = 'DATE_FORMAT(dataHora, "%Y-%m") = "'+parametro+'" and tipo = "' +tipo+ '"'
        } else if (data === "ano") {
            const parametro = ano
            condicao = 'DATE_FORMAT(dataHora, "%Y") = "'+parametro+'" and tipo = "' +tipo+ '"'
        } else if (data === "geral"){
            condicao = 'tipo = "' +tipo+ '"'
        }
    }

    knex("ocorrencias")
        .whereRaw(condicao)
        .then((dados) => {
            res.send(dados)
        })
})


app.get("/ocorrenciasUsuario", (req,res) => {
    knex("ocorrencias").where({usuario: req.query.usuario}).then((dados) =>{
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
      "endereco": req.body.endereco,
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