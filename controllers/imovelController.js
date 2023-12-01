import { Imovel } from "../models/Imovel.js"
import { Log } from "../models/Log.js"


export async function imovelIndex(req, res) {
    try {
      const imovel = await Imovel.findAll()
      res.status(200).json(imovel)
    } catch (error) {
      res.status(400).send(error)
    }
  }

export async function imovelCreate(req, res) {
  const { rua, cidade, bairro } = req.body

  if (!rua || !cidade || !bairro) {
    res.status(400).json("Erro... Informe nome e cidade da marca")
    return
  }

  try {
    const imovel = await Imovel.create({
        rua, cidade, bairro      
    })
    res.status(201).json(imovel)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function imovelUpdate(req, res) {
    const { id } = req.params
    const { rua, cidade, bairro } = req.body
  
    if (!rua || !cidade || !bairro) {
      res.status(400).json("Erro... Informe modelo, marca, ano, preco, placa")
      return
    }
  
    try {
      const imovel = await Imovel.update({
        rua, cidade, bairro
      },
        {
          where: { id }
        })
      res.status(200).json(imovel)
    } catch (error) {
      res.status(400).send(error)
    }
  }

export async function imovelDestroy(req, res) {
    const { id } = req.params

    try {
      await Imovel.destroy({ where: { id }})

      await Log.create({descricao: `Exclusão de Imovel: ${id}`,
       complemento: `Usuário: ${req.usuario_logado_id} - ${req.usuario_logado_nome}`})
  
      res.status(200).json({msg: 'Ok! Imovel removido com sucesso'})
    } catch (error) {
      res.status(400).send(error)
    }
  }

