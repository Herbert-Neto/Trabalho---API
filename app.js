import express from 'express'
import { sequelize } from './database/conecta.js'
import routes from './routes.js'
import cors from 'cors'
import { Imovel } from './models/Imovel.js'
import { Usuario } from './models/Usuario.js'
import { Log } from './models/Log.js'
import { Troca } from './models/Troca.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
    res.send('Sistema de Cadastro de Moveis')
})

async function conecta_db() {
    try {
      await sequelize.authenticate();
      console.log('Conexão com Banco de Dados realizada com Sucesso');
      await Imovel.sync()
      console.log("Tabela de Imoveis: Ok")
      await Usuario.sync()
      console.log("Tabela de Usuarios: Ok")
      await Log.sync()
      console.log("Tabela de Logs: Ok")
      await Troca.sync()
      console.log("Tabela de Trocas de Senha: Ok")
    } catch (error) {
      console.error('Erro ao conectar o banco de dados:', error);
    }  
  }
conecta_db()

app.listen(port, () => {
    console.log(`API de Imoveis Rodando na Porta: ${port}`)
  })



