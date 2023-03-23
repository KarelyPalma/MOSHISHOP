import express from "express";

import cors from "cors";
import { categoriasRouter } from "./src/Categorias/route.js";
import { productoRouter } from "./src/Productos/route.js";
import { proveedoresRouter } from "./src/Proveedores/route.js";
import { comprasRouter } from "./src/Compras/route.js";
import { usuarioRouter } from "./src/Usuarios/route.js";
import { rolesRouter } from "./src/Roles/routes.js";
import { cartsRouter } from "./src/Cart/route.js";
import { favoriteRouter } from "./src/favorite/route.js";

export const app = express(); 

app.use(express.json());

app.use(cors());
app.use('/', express.static('./public'));

//your api rest endpoints

app.use("/categorias", categoriasRouter);
app.use("/productos", productoRouter);
app.use("/proveedores", proveedoresRouter);
app.use("/compras", comprasRouter);
app.use("/usuarios", usuarioRouter);
app.use("/roles", rolesRouter);
app.use("/cart",cartsRouter);
app.use("/favorite",favoriteRouter)
// app.use('/provedores', Prove)
