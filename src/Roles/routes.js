import { Router } from "express";
import { accesdoAdministradores, userAuthentification } from '../middlewares/auths/auths.js';
import * as roleController from "./controller.js";
 export const rolesRouter = Router();

 rolesRouter.post("/agregar",roleController.agregar);

 rolesRouter.get("/buscar",roleController.buscar);