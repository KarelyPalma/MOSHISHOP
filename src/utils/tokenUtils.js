import jwt from "jsonwebtoken";
import { signture } from "./env.js";

export const validarToken = token => jwt.verify(token, signture,);

//export const decodificarToken = token => jwt.decode(token);

export const generarToken = usuario => jwt.sign(usuario, signture, {
    expiresIn: "7d"
}); //retorna un token