import { Router } from "express";
import * as cartscontroller from "./controller.js";
import { userAuthentification } from "../middlewares/auths/auths.js";

export const cartsRouter = Router();

cartsRouter.post("/agregar",userAuthentification,cartscontroller.agregaralcarrito);

cartsRouter.get("/obtener",userAuthentification,cartscontroller.obtenerCarrito);

cartsRouter.delete("/eliminar",userAuthentification,cartscontroller.eliminar);

cartsRouter.put("/actualizar",userAuthentification,cartscontroller.actualizarProductoCarrito);
