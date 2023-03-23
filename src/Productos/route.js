import { Router } from "express";
import { accesdoAdministradores, userAuthentification } from '../middlewares/auths/auths.js';
import * as productosController from "./controller.js";
import { upload} from "../middlewares/auths/upload.js";
export const productoRouter = Router();


productoRouter.post("/agregarP",userAuthentification,accesdoAdministradores,upload.single("imagen"), productosController.agregarP);//crea un prodcuto

productoRouter.get("/buscar", productosController.buscar);//busca todos los productos

productoRouter.put("/actualizar/:codigo",userAuthentification, accesdoAdministradores, upload.single("imagen"),productosController.actualizar);//actualizar un producto

productoRouter.delete("/eliminarID/:codigo",userAuthentification, accesdoAdministradores, productosController.eliminarID); //elimina el productos atra vez de un req.params osea pasandole el codigo desde la url

productoRouter.get("/Buscarporcategoria",productosController.buscarporcategorias);//busca los productos por su categoria, es decir te traera todos los productos relacionados con esa categoria
                                                                                                                                                                                                                                                                                                                                                                      
productoRouter.get("/findbyname",productosController.FindByName)//busca los productos en base a su nombre