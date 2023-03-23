import { favorite } from "./model.js";
import { validarToken } from "../utils/tokenUtils.js";
import { Usuarios } from "../Usuarios/model.js";
import { Productos } from "../Productos/model.js";

export const agregar = async (req,res)=>{
    try{
        const Usuarios = validarToken(req.headers.authorization);
        
        const { ProductoCodigo } = req.body;
        // Verificar si el producto ya está en favoritos del usuario
        const favoritoExistente = await favorite.findOne({
            where: { ProductoCodigo, UsuarioCorreo: Usuarios.correo },
        });
        
        if (favoritoExistente) {
            return res
            .status(400)
            .json({ message: 'El producto ya está en tus favoritos' });
        }


        const Producto = await Productos.findOne({ where: { codigo: ProductoCodigo } });
        if (!Producto) {
        return res.status(404).json({ message: `No se encontró el producto con código ${ProductoCodigo}` });
        }
    
        // Crear un registro en la tabla Favoritos con el correo del usuario y el codigo del producto
        await favorite.create({
            UsuarioCorreo: Usuarios.correo,
            ProductoCodigo: Producto.codigo,
        });
        const ProductoAgregado = await Productos.findOne({ where: { codigo: ProductoCodigo } });

        res.status(200).json({ favorite: favorite, producto: ProductoAgregado });
    }catch(err){
        console.log(err);
        res.status(500).json({ msg : err});
    }

};

export const getfav = async(req,res)=>{
try{
    const { correo } = validarToken(req.headers.authorization);

    const fav = await favorite.findAll({
        where: { UsuarioCorreo: correo },
        include: [{
          model: Productos,
          attributes: ['nombre', 'precio', 'descripcion']
        }],
        attributes: { exclude: ['id', 'ProductoCodigo', 'UsuarioCorreo', 'createdAt', 'updatedAt'] }
      });
  
      res.status(200).json({ UsuarioCorreo: correo, fav });
}catch(err){
    console.log(err.message);
    res.status(500).json({ message: 'Error al obtener los favoritos' });
}
}

export const eliminar = async (req,res)=>{
    
    const { correo } = validarToken(req.headers.authorization);
    try {
    const { ProductoCodigo } = req.body;
    const fav = await favorite.findOne({ where: { UsuarioCorreo: correo, ProductoCodigo } });
    if (!fav) {
    return res.status(404).json({ message: 'El producto no está en favoritos' });
    }
    await fav.destroy();
    const newFav = await favorite.findAll({
        where: { UsuarioCorreo: correo },
        include: [{
        model: Productos,
        attributes: ['nombre', 'precio', 'descripcion']
        }],
        attributes: { exclude: ['id', 'ProductoCodigo', 'UsuarioCorreo', 'createdAt', 'updatedAt'] }
    });
    res.status(200).json({
        message: 'Producto eliminado de favoritos',
        fav: newFav
    });
    } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Error al eliminar el producto de favoritos' });
    }
}