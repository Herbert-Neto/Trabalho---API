import { Troca } from "../models/Troca.js"
import { Usuario } from "../models/Usuario.js"


export async function usuarioIndex(req, res) {
    try {
      const usuarios = await Usuario.findAll()
      res.status(200).json(usuarios)
    } catch (error) {
      res.status(400).send(error)
    }
  }

function validaSenha(senha) {

    const mensa = []
  
    // .length: retorna o tamanho da string (da senha)
    if (senha.length < 8) {
      mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
    }
  
    // contadores
    let pequenas = 0
    let grandes = 0
    let numeros = 0
    let simbolos = 0
  
    // senha = "abc123"
    // letra = "a"
  
    // percorre as letras da variável senha
    for (const letra of senha) {
      // expressão regular
      if ((/[a-z]/).test(letra)) {
        pequenas++
      }
      else if ((/[A-Z]/).test(letra)) {
        grandes++
      }
      else if ((/[0-9]/).test(letra)) {
        numeros++
      } else {
        simbolos++
      }
    }
  
    if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
      mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
    }
  
    return mensa
  }
  
export async function usuarioCreate(req, res) {
    const { nome, email, senha } = req.body
  
    if (!nome || !email || !senha) {
      res.status(400).json("Erro... Informe nome, email e senha da marca")
      return
    }
  
    const mensagem = validaSenha(senha)
    if (mensagem.length > 0) {
      res.status(400).json({ erro: mensagem.join(', ') })
      return
    }
  
    try {
      const usuario = await Usuario.create({
        nome, email, senha
      })
      res.status(201).json(usuario)
    } catch (error) {
      res.status(400).send(error)
    }
  }

export async function usuarioTrocaSenha(req, res) {
    const { hash } = req.params
    const { email, novasenha } = req.body
  
    if (!email || !novasenha) {
      res.status(400).json("Erro... Informe email e a nova senha do usuário")
      return
    }
  
    const troca = await Troca.findOne({ where: { email, hash } })
  
    if (troca == null) {
      res.status(400).json({ msg: "Erro... Verifique seu e-mail ou os dados enviados" })
      return
    }
  
    const mensagem = validaSenha(novasenha)
    if (mensagem.length > 0) {
      res.status(400).json({ erro: mensagem.join(', ') })
      return
    }
  
    try {
      await Usuario.update({
        senha: novasenha
      }, {
        where: { email },
        individualHooks: true
      })
      res.status(200).json({ msg: 'Ok! Senha Alterada com Sucesso' })
    } catch (error) {
      res.status(400).send(error)
    }
  }
  