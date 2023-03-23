import { sequelize } from "../Database/configDB.js";
import { DataTypes } from "sequelize";

export const Categorias = sequelize.define("Categorias", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  nombre: {
    type: DataTypes.STRING(),
    allowNull: false,
    primaryKey:true,
    unique:true
  },
});


