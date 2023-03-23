import { sequelize } from "../Database/configDB.js";
import { DataTypes } from "sequelize";
import { Usuarios } from "../Usuarios/model.js";


export const Roles = sequelize.define("Roles", {
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true,
    defaultValue: 'cliente'
  },
});

Usuarios.belongsTo(Roles, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

Roles.hasMany(Usuarios);