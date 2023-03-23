import { app } from "./app.js";
import { Categorias } from "./src/Categorias/model.js";
import { sequelize } from "./src/Database/configDB.js";
import { Productos } from "./src/Productos/model.js";
import { Compras } from "./src/Compras/models.js";
import { Provedores } from "./src/Proveedores/models.js";
import { PORT } from "./src/utils/env.js";


//importa tus modelos

const main = async () => {
  try {
  //sequelize.sync({ force: true }); //genera todos los modelos
    app.listen(PORT, () => {
      console.log(
        `server listen on port: ${PORT},`,
        "url: http://localhost:4000"
      );
    });
    //sequelize.authenticate();
  } catch (err) {
    console.log(err);
  }
};

main(); //execute the proyect
