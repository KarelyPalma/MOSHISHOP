import { Router } from "express";
import { accesdoAdministradores, userAuthentification,} from '../middlewares/auths/auths.js';
import * as proveedoresController from "./controller.js";

export const proveedoresRouter = Router();

proveedoresRouter.post("/agregar",  proveedoresController.agregar);

proveedoresRouter.get("/buscar",proveedoresController.buscar);

proveedoresRouter.put("/actualizar", proveedoresController.actualizar);

proveedoresRouter.delete("/eliminarbyID", proveedoresController.elimarbyID);

