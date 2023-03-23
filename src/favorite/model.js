import { sequelize } from "../Database/configDB.js";
import { DataTypes, UUID } from "sequelize";
import { Productos } from "../Productos/model.js";
import { Usuarios } from "../Usuarios/model.js";

export const favorite = sequelize.define("Favorites",{
id:{
type: UUID,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
}
});
export const fav = sequelize.define("fav");


favorite.belongsTo(Productos,{
    through:fav,
    onDelete:"cascade",
    onUpdate:"cascade"
})
Productos.hasMany(favorite);

favorite.belongsTo(Usuarios,{
    through:fav,
    onDelete:'cascade',
    onUpdate:'cascade'
})

Usuarios.hasOne(favorite);

