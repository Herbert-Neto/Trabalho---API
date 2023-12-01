import { Router } from "express"
import { imovelCreate, imovelDestroy, imovelIndex, imovelUpdate } from "./controllers/imovelController.js"
import { usuarioCreate, usuarioIndex, usuarioTrocaSenha } from "./controllers/usuarioController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"
import { enviaEmail } from "./controllers/mailController.js"

const router = Router()

// Rotas do Imovel
router.get("/imoveis", imovelIndex)
      .post("/imoveis", verificaLogin, imovelCreate)
      .patch("/imoveis/:id", verificaLogin, imovelUpdate)
      .delete("/imoveis/:id", verificaLogin ,imovelDestroy)

// Rotas do Usuario
router.get("/usuarios", usuarioIndex)
      .post("/usuarios", usuarioCreate)
      .get("/usuarios/solicitasenha", enviaEmail)

router.get("/login", loginUsuario)
router.patch("/trocasenha/:hash", usuarioTrocaSenha)


export default router