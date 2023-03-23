import { Router } from "express";
import { userAuthentification } from "../middlewares/auths/auths.js";
import * as favoriteController from "./controller.js";

export const favoriteRouter = Router();

favoriteRouter.get("/gettfav",userAuthentification,favoriteController.getfav);

favoriteRouter.post("/agregarfav",userAuthentification, favoriteController.agregar);

favoriteRouter.delete("/eliminar",userAuthentification,favoriteController.eliminar)