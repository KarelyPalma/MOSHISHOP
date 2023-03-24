import { Op } from "sequelize";
import { generarToken, validarToken } from "../utils/tokenUtils.js";
import { Usuarios } from "./model.js";

export const login = async (req, res) => {
  const { correo, password } = req.body;
  console.log(req.body);
  try {
    const usuario = await Usuarios.findOne({
      where: { [Op.and]: [{ correo }, { password }] },
    });

    const token = generarToken(usuario.dataValues);
    // const token = generarToken(usuario);
    res.status(200).json([token, usuario]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

export const registro = async (req, res) => {
  try {
    req.body.RoleNombre = "cliente";
    const usuario = await Usuarios.create(req.body); 
    console.log(usuario);// igual como esta en tu base de datos    const token = generarToken(usuario.dataValues);
    res.status(200).json(usuario);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err });
  }
};

export const registroAdmin = async (req, res) => {
  try {
    req.body.RoleNombre = "admin";
    const usuario = await Usuarios.create(req.body);
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const buscarAdmins = async (req, res)=>{
  //const {RoleNombre}=req.body;
  try{
   // const rol= await Roles.findAll(RoleNombre);
      const admin = await Usuarios.findAll({
        where: {
          RoleNombre:'admin'
        }
      });
      res.status(200).json(admin);
  }catch (err){
    res.status(500).json({ message: 'Error al obtener los administradores' });
  }
};
export const buscarusers = async (req, res)=>{
  //const {RoleNombre}=req.body;
  try{
   // const rol= await Roles.findAll(RoleNombre);
      const usuario = await Usuarios.findAll({
        where: {
          RoleNombre:'cliente'
        }
      });
      res.status(200).json(usuario);
  }catch (err){
    res.status(500).json({ message: 'Error al obtener el cliente' });
  }
};
export const eliminarAdmin = async (req,res)=>{
  const { correo } = req.params;
   
  try {
       const usuario = await Usuarios.findOne({where: {correo}});

  if (!usuario) {
    return res.status(404).json({ mensaje: 'admin no encontrado no encontrado' });
  }
      usuario.destroy();
      res.status(200).json(usuario);
  }catch (err) {
      console.log(err);
      res.status(500).json({ msg: err });
  }
};

export const buscarusersid = async (req, res)=>{
  const { correo } = req.params;
  try{
      const usuario = await Usuarios.findOne({where: { correo}});
      res.status(200).json(usuario);
  }catch (err){
    res.status(500).json({ message: 'Error al obtener el cliente' });
  }
};

  export const actualizarUsuario = async (req, res) => {
    const { correo, nombre, password,telefono,Direccion } = req.body;
    try {
      const usuario = await Usuarios.findOne({ where: { correo } });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      usuario.nombre = nombre || usuario.nombre;
      usuario.password = password || usuario.password;
      usuario.telefono= telefono || usuario.telefono;
      usuario.Direccion = Direccion || usuario.Direccion;

      await usuario.save();
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  };
  

