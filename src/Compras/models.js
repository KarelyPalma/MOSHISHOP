import { sequelize } from "../Database/configDB.js";
import { DataTypes, DATE } from "sequelize";
import { Productos } from "../Productos/model.js";
import { Usuarios } from "../Usuarios/model.js";

export const Compras = sequelize.define("Compras", {
  
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  unidades: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total:{
    type:DataTypes.DOUBLE(10,2),
    allowNull:false,
    defaultValue:0
  }
});

export const ventas = sequelize.define("ventas");

Compras.belongsToMany(Productos, {
  through:ventas,
  onDelete: "cascade",
  onUpdate: "cascade",
});

Productos.hasMany(Compras);

Compras.belongsToMany(Usuarios,{
  through:ventas,
  onDelete:"cascade",
  onUpdate:"cascade"
});

Usuarios.hasMany(Compras);