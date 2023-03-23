import { Router } from "express";
import * as comprasController from "./controller.js";
export const comprasRouter = Router();

comprasRouter.post("/agregar",comprasController.agregar);

comprasRouter.get("/buscar",comprasController.buscar);

