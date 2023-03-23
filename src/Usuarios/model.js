import { sequelize } from "../Database/configDB.js";
import { DataTypes } from "sequelize";

export const Usuarios = sequelize.define("Usuarios",{
    id:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    correo:{
        unique:true,
        allowNull: false,
        type: DataTypes.STRING(),
        primaryKey:true,

    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    telefono: {
        unique : true,
        type: DataTypes.STRING(),
    },
    Direccion:{
        type:DataTypes.STRING(),
        allowNull: false,
    },
})