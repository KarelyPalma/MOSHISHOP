import { Roles } from "../../Roles/models.js";
import { Usuarios } from "../../Usuarios/model.js";
import { validarToken } from "../../utils/tokenUtils.js";

//Authorizacion

export const accesdoAdministradores = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decodificado = validarToken(authorization);
    const usuario = await Usuarios.findOne({ correo: decodificado.correo });
    const rol = await Roles.findOne({ nombre: usuario.RoleNombre });
    if (rol.nombre !== "admin")
      throw new Error("solo los administradores esta autorizados");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};

//Atutentificacion

export const userAuthentification = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const usuario = validarToken(authorization);
    if (!usuario) throw new Error("token válido pero no existes en mi bd");
    next();
  } catch (err) {}
};
