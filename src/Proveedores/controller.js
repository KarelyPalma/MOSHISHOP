import { Provedores } from "./models.js";

export const agregar = async( req, res)=>{
    const {nombre,correo, tel,matricula}= req.body;
    try{
        const Provedor = await Provedores.create({nombre,correo,tel,matricula});
        res.status(200).json(Provedor);
    }catch(err){
        console.log(err);
        res.status(500).json({msg : err});
    }

};

export const buscar = async(req,res)=>{
    try{
        const Provedores = await Provedores.findAll();
        res.status(200).json(Provedores);
    }catch (err){
        res.status(500).json({msg : err});
    }
    
};

export const elimarbyID = async (req , res)=>{
    const {id}= req.body;
    try{
        const Proveedor = await Provedores.destroy({ where : {id}})
        res.status(200).json(Proveedor);
    }catch(err){
        console.log(err);
        res.status(500).json({ msg: err });
    }
};

export const actualizar = async (req, res)=>{
    const {nombre, correo,tel,id}= req.body;
    try{
        const Provedor = await Provedores.update({where : {id, nombre,correo,tel}});
        res.status(200).json(Provedor);
    }catch(err){
        console.log(err);
        res.status(500).json({ msg : err});
    }
};