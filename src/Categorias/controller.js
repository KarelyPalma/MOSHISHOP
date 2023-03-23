import { Categorias } from "./model.js";

export const agregar = async (req, res) => {
  const { nombre } = req.body;

  try {
    const categoria = await Categorias.create({ nombre });
    res.status(200).json(categoria);

  } catch (err){
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

export const buscarTodos = async (req, res) => {
  try {
    const categorias = await Categorias.findAll();
    res.status(200).json(categorias);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};



/*export const eliminarPorID = async (req, res) => {
  const { nombre } = req.body;

  try {
    const categoria = await Categorias.destroy({ where: { nombre } });
    res.status(200).json(categoria);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};*/

export const eliminarPorNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    const categoria = await Categorias.destroy({ where: { nombre } });
    res.status(200).json(categoria);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

/*export const actualizar = async (req, res) => {
  const { nombre}= req.body;

  try {
    const categoria = await Categorias.update({ nombre });
    res.status(200).json(categoria);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};*/
