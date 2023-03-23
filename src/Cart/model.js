import { sequelize } from "../Database/configDB.js";
import { DataTypes } from "sequelize";
import { Productos } from "../Productos/model.js";
import { Usuarios } from "../Usuarios/model.js";

export const Carts = sequelize.define("Carts", {
  quantity:{
        type: DataTypes.INTEGER(),
        allowNull:false,
        defaultValue:0,
    },
    pay:{
        type:DataTypes.DOUBLE(10,2),
        allowNull: false,
        defaultValue:0
    }
});
export const shopping = sequelize.define("shopping");
Carts.belongsTo(Productos,{
    through:shopping,
    onDelete: "cascade",
    onUpdate: "cascade", 
}
);
Productos.hasMany(Carts);


Carts.belongsTo(Usuarios,{
    through:shopping,
    onDelete:'cascade',
    onUpdate:'cascade'
});

Usuarios.hasOne(Carts);