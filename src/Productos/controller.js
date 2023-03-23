import { Productos } from "./model.js";
import { Categorias } from "../Categorias/model.js";
import { Op } from 'sequelize';
import { cloudinaryv2} from "../middlewares/auths/upload.js";

export const agregarP = async ( req, res ,)=>{
    const { codigo,nombre,descripcion,cantidad,precio,CategoriaNombre}= req.body;
    try{ 
        console.log(req.file);
        const imagenBase64 = req.file.buffer.toString('base64');
        const result = await cloudinaryv2.uploader.upload(`data:${req.file.mimetype};base64,${imagenBase64}`);
            const categoria = await Categorias.findOne({ where: { nombre: CategoriaNombre } });
            if (!categoria) {
            throw new Error('no se encontró la categoría');
            }
    
            const Producto = await Productos.create({
            codigo,
            nombre,
            descripcion,
            cantidad,
            precio,
            imagen: result.secure_url,
            public_id: result.public_id,
            CategoriaNombre,
            });
    
            return res.status(201).json(Producto);

    }catch (err){
        console.log(req.file)
        console.log(err.message);
        res.status(500).json({ msg : err});
    }
};

export const buscar = async (req, res)=>{
    try{
        const Producto = await Productos.findAll();
        res.status(200).json(Producto);
    }catch (err){
        res.status(500).json({msg:err});
    }
};


export const FindByName = async (req, res) => {
const { nombre } = req.query;
try {
    const productos = await Productos.findAll({
    where: {
        nombre: {
        [Op.like]: `%${nombre}%`
        }
    }
    });
    if (productos.length === 0) {
    return res.status(404).json({
        message: `No se encontraron productos con la palabra '${nombre}'`
    });
    }
    res.status(200).json(productos);
} catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error interno del servidor' });
}
};

export const buscarporcategorias = async (req, res)=>{
    const {CategoriaNombre} = req.query;
    try{
        const Producto= await Productos.findAll({
            include:[{
                model: Categorias,
                where:{nombre: CategoriaNombre}
            }]
        })
        console.log(CategoriaNombre)
        res.status(200).json(Producto);
    }catch (err){
        res.status(500).json({msg:err});
    }
};


export const eliminarID = async (req, res)=>{
    
        const id = req.params.id;
    
        try {
        const producto = await Productos.findOne({ where: { id } });
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
    
          // Eliminar imagen de Cloudinary
        await cloudinaryv2.uploader.destroy(producto.public_id);
    
          // Eliminar producto de la base de datos
        await Productos.destroy({ where: { id } });
    
        return res.json({ msg: 'Producto eliminado correctamente' });
        } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al eliminar producto' });
        }

};


export const actualizar = async (req, res)=>{
    const { codigo } = req.params;
    const { nombre, descripcion, cantidad, precio, CategoriaNombre } = req.body;
    
    try {
    let updateFields = { nombre, descripcion, cantidad, precio, CategoriaNombre };
    let imagen;

    if (req.file) {
        const imagenBase64 = req.file.buffer.toString('base64');
        const result = await cloudinaryv2.uploader.upload(`data:${req.file.mimetype};base64,${imagenBase64}`);
        updateFields.imagen = result.secure_url;
        updateFields.public_id = result.public_id;
        imagen = result;
    }

    const categoria = await Categorias.findOne({ where: { nombre: CategoriaNombre } });
    if (!categoria) {
        throw new Error('No se encontró la categoría');
    }

    const producto = await Productos.findOne({ where: { codigo } });
    if (!producto) {
        throw new Error('No se encontró el producto');
    }

      // Eliminar imagen anterior en caso de que haya una nueva
    if (imagen && producto.public_id) {
        await cloudinaryv2.uploader.destroy(producto.public_id);
    }

      // Actualizar producto
    const updatedProducto = await producto.update(updateFields);

    res.status(200).json(updatedProducto);
    } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg : err.message });
    }
};