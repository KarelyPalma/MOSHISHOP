import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize('moshishop', 'root', '', {
   //  host: 'localhost',
   //  dialect: 'mysql'
 //});

export const sequelize = new Sequelize('mysql://root:UawLMthooghnjnbqDmb8@containers-us-west-192.railway.app:5617/railway');

/*const Usuarios = sequelize.define('Usuarios', {
    // define las propiedades de Usuario
  });
  
  // Elimina la restricción de clave foránea
  await sequelize.queryInterface.removeConstraint('Usuarios', 'Usuarios_ibfk_2');
  
  // Elimina la tabla 'Favorites'
  await sequelize.queryInterface.dropTable('Favorites');*/