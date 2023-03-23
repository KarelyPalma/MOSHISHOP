import { Productos } from "../Productos/model.js";
import { Carts } from "./model.js";
import {validarToken } from "../utils/tokenUtils.js"
//------------------------------------------------------------------------------------------------------------
export const agregaralcarrito = async (req,res)=>{
try{
    const Usuarios = validarToken(req.headers.authorization);
    const {ProductoCodigo,quantity}= req.body;

 //buscamos el producto con su identificador unico
    const producto = await Productos.findOne({
        where: { codigo:ProductoCodigo }
    });
//buscamos el producto en la base de datos
    if(!producto){
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    //verificamos que exista la cantidad solicitada
    if (producto.cantidad < quantity) {
        return res.status(400).json({ message: 'Cantidad solicitada no disponible' });
    }

    //checamos que exista el producto en el carrito 
    const cart = await Carts.findOne({
        where: { ProductoCodigo,UsuarioCorreo: Usuarios.correo }
    });

    if (cart) {
        // Actualizar la cantidad del producto
        cart.quantity += quantity;
        cart.pay += quantity * producto.precio;
        await cart.save();
    } else {
        // Agregar un nuevo producto al carrito
        const pay = quantity * producto.precio;
        await Carts.create({ quantity, pay, 
            ProductoCodigo:producto.codigo,
            UsuarioCorreo: Usuarios.correo, });
    }

    // Obtener la cantidad de productos en el carrito y el total a pagar
    const CART = await Carts.findAll({
      where: { UsuarioCorreo: Usuarios.correo },
    });
    const pay = CART.reduce((sum, item) => sum + item.pay, 0);

    res.status(200).json({ 
        message: 'Producto agregado al carrito', 
        pay,
        producto
     });
    
}catch(err){
//si surge algun error lo capturamos y lo imprimimos en consola
console.log(err.message);
res.status(500).json({ message: 'Error al agregar el producto al carrito' });
}
};

//--------------------------------------------------------------------------------------------------------------------------------------//

export const obtenerCarrito = async (req, res) => {
    try {
        const Usuarios = validarToken(req.headers.authorization);
    // Obtener los productos del carrito
    const carrito = await Carts.findAll({
    where: { UsuarioCorreo: Usuarios.correo },
    include: [{
    model: Productos,
    attributes: ['nombre', 'precio','descripcion']
    }],
        attributes: { exclude: ['id','ProductoCodigo', 'UsuarioCorreo', 'quantity', 'createdAt', 'updatedAt'] }
    });

      // Obtener la cantidad de productos en el carrito y el total a pagar
    const paytotal = carrito.reduce((sum, item) => sum + item.pay, 0);

    res.status(200).json({ carrito, paytotal,UsuarioCorreo:Usuarios.correo });
    } catch (err) {
      //si surge algun error lo capturamos y lo imprimimos en consola
    console.log(err.message);
    res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

//------------------------------------------------------------------------------------------------------------------
export const eliminar = async (req,res)=>{
    try {
        const Usuarios = validarToken(req.headers.authorization);
        const usuarioCorreo = Usuarios.correo;
    
        const { ProductoCodigo } = req.body;
        const cart = await Carts.findOne({ where: { UsuarioCorreo: usuarioCorreo, ProductoCodigo } });
        if (!cart) {
        return res.status(404).json({ message: 'El producto no está en el carrito' });
        }
        await cart.destroy();
        const CART = await Carts.findAll({ where: { UsuarioCorreo: usuarioCorreo } });
        const pay = CART.reduce((sum, item) => sum + item.pay, 0);
        res.status(200).json({
        message: 'Producto eliminado del carrito',
        pay,
        UsuarioCorreo: usuarioCorreo
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
    }
}

//----------------------------------------------------------------------------------------------------------
    export const actualizarProductoCarrito = async (req, res) => {
        try {
            const Usuarios = validarToken(req.headers.authorization);
            const usuarioCorreo = Usuarios.correo;
        
            const { ProductoCodigo, quantity } = req.body;
            const producto = await Productos.findOne({ where: { codigo: ProductoCodigo } });
            if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
            }
            const cart = await Carts.findOne({ where: { UsuarioCorreo: usuarioCorreo, ProductoCodigo } });
            if (!cart) {
            return res.status(404).json({ message: 'El producto no está en el carrito' });
            }
            if (producto.cantidad < quantity) {
            return res.status(400).json({ message: 'Cantidad solicitada no disponible' });
            }
            cart.quantity = quantity;
            cart.pay = quantity * producto.precio;
            await cart.save();
            const CART = await Carts.findAll({ where: { UsuarioCorreo: usuarioCorreo } });
            const pay = CART.reduce((sum, item) => sum + item.pay, 0);
            res.status(200).json({
            message: 'Producto actualizado en el carrito',
            pay,
            ProductoCodigo: producto.codigo,
            UsuarioCorreo: usuarioCorreo
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: 'Error al actualizar el producto en el carrito' });
        }
};