import nodemailer from "nodemailer"
import md5 from "md5"

import { Usuario } from "../models/Usuario.js";
import { Troca } from "../models/Troca.js";

// async..await is not allowed in global scope, must use a wrapper
async function main(nome, email, hash) {

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "fc3eb6d29259c1",
      pass: "3d1b432e0791d5"
    }
  });

  const link = "http://localhost:3000/trocasenha/" + hash

  let mensa = "<h4>Sistema de Cadastro de Imoveis</h4>"
  mensa += `<h6>Estimado Usuário: ${nome}</h6>`
  mensa += "<h6>Você solicitou a troca de senha da sua conta...</h6>"
  mensa += "<p>Clique no link abaixo para realizar a troca</p>"
  mensa += `<a href="${link}">Alterar sua senha</a>`

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Sistema de Cadastro de Imoveis" <imoveis@email.com>', // sender address
    to: email, // list of receivers
    subject: "Solicitação de Troca de Senha", // Subject line
    text: `Copie e cole o endereço ${link} para alterar`, // plain text body
    html: mensa, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export async function enviaEmail(req, res) {
  const { email } = req.body

  try {
    const usuario = await Usuario.findOne({ where: { email }})

    if (usuario == null) {
      res.status(400).json({erro: "Erro... e-mail não cadastrado"})
      return
    }

    const hash = md5(usuario.nome + email + Date.now())

    main(usuario.nome, email, hash).catch(console.error)
    
    Troca.create({email, hash})

    res.status(200).json({msg: 'Ok! E-mail enviado com sucesso'})
  } catch (error) {
    res.status(400).json({error})
  }
}
