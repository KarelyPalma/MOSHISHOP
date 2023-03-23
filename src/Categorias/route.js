import { Router } from "express";
import { accesdoAdministradores, userAuthentification } from "../middlewares/auths/auths.js";
import * as categoriasController from "./controller.js";

export const categoriasRouter = Router();

categoriasRouter.post("/agregar",userAuthentification, accesdoAdministradores,categoriasController.agregar);

categoriasRouter.get("/buscarTodos",categoriasController.buscarTodos);

//categoriasRouter.put("/actualizar", categoriasController.actualizar);

categoriasRouter.delete("/eliminarPorNombre/:nombre",userAuthentification, accesdoAdministradores, categoriasController.eliminarPorNombre);
