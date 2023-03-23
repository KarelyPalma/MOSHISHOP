import { Productos } from "../Productos/model.js";
import { Usuarios } from "../Usuarios/model.js";
import { Compras } from "./models.js";

export const agregar = async( req, res )=>{
    const{unidades,ProductoCodigo,UsuarioCorreo}=req.body;
    try{
        const Producto = await Productos.findByPk(ProductoCodigo);
        if(!Producto){
            return res.status(404).json({error: 'producto no encontrado'});
        }
        const Usuario = await Usuarios.findByPk(UsuarioCorreo);
        if(!Usuario){
            return res.status(404).json({error:'usuario no encontrado'});
        }
        if(Producto.cantidad < unidades){
            return res.status(400).json({error:'stock insuficiente'})
        }
        const totalApagar = Producto.precio * unidades;

        await Compras.create({
            ProductoCodigo,
            unidades,
            UsuarioCorreo,
            total: totalApagar,
        });
        await Producto.update({
            cantidad: Producto.cantidad - unidades,
          });
        res.json({totalApagar});

    }catch(error){
        console.log(error);
        res.status(500).json({error:'error interno del servidor'});
    }

};

export const buscar= async( req, res)=>{
    try{
        const Compras= await Compras.findAll({nombreProducto,precio,cantidad});
        res.status(200).json(Compras);
    }catch(err){
        res.status(500).json({msg:err})
    }
};


