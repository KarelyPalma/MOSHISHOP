import {Roles} from"./models.js";
import { Usuarios } from "../Usuarios/model.js";

export const agregar = async (req,res)=>{
    const {nombre}= req.body;
    try{
        const Rol = await Roles.create({nombre});
        return res.status(200).json(Rol);
    }catch(err){
        console.log(err.message);
        res.status(204).json({msg:err});
    }
};

export const buscar = async (req, res)=>{
    try{
        const Usuario = await Usuarios.findAll({ 
            include :{
                model: Roles,
                require: true,
                where:
                {
                    nombre :'admin',
                }
            }
        });
        res.status(201).json(Usuario);
    }catch(err){
        console.log(err);
        res.status(404).json({msg:err});
    }
};