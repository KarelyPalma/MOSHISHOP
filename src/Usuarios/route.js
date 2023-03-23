import { Router } from "express";
import { accesdoAdministradores, userAuthentification } from "../middlewares/auths/auths.js";
import * as usuariosController from "./controlller.js"

export const usuarioRouter = Router();


usuarioRouter.post("/login",usuariosController.login);
usuarioRouter.post("/registro",usuariosController.registro);
usuarioRouter.post('/registro-admins', userAuthentification, accesdoAdministradores, usuariosController.registroAdmin)
usuarioRouter.get("/buscarAdmins",userAuthentification, accesdoAdministradores,usuariosController.buscarAdmins);
usuarioRouter.get("/buscarUsuarios",userAuthentification, accesdoAdministradores,usuariosController.buscarusers);
usuarioRouter.delete("/eliminarAdmin/:correo",userAuthentification, accesdoAdministradores,usuariosController.eliminarAdmin);

usuarioRouter.post('/admin', usuariosController.registroAdmin);

usuarioRouter.get('/buscaruser/:correo',usuariosController.buscarusersid);

usuarioRouter.put("/actualizar",usuariosController.actualizarUsuario)