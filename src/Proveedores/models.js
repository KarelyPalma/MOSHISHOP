import { sequelize } from "../Database/configDB.js";
import { DataTypes } from "sequelize";
import { Productos } from "../Productos/model.js";

export const Provedores = sequelize.define("Provedores", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  correo: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING(124),
  },
  tel: {
    unique: true,
    type: DataTypes.STRING(10),
  },
  matricula:{
    type:DataTypes.STRING(),
    primaryKey: true,
    unique:true,
    allowNull:false,
  },
});

export const ProvedoresProductos = sequelize.define("ProvedoresProductos");

Provedores.belongsToMany(Productos, {
  through: ProvedoresProductos,
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Productos.belongsToMany(Provedores, {
  through: ProvedoresProductos,
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
