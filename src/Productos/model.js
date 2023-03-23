import { sequelize } from "../Database/configDB.js";
import { DataTypes, UUIDV4 } from "sequelize";
import { Categorias } from "../Categorias/model.js";

export const Productos = sequelize.define("Productos", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  nombre: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  descripcion:{
    type:DataTypes.STRING(),
    allowNull:true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  codigo:{
    primaryKey: true,
    type:DataTypes.STRING(),
    unique:true
  },
  imagen:{
    type:DataTypes.STRING(),
    allowNull:true,
  },
  public_id:{
    type: DataTypes.STRING, // identificador público de la imagen en Cloudinary
      allowNull: true,
  }
});

Productos.belongsTo(Categorias, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Categorias.hasMany(Productos);