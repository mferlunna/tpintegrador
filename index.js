console.log("clinica");

import express from "express";
import dotenv from "dotenv";
import { testConexion } from "./controlador/testconexion.js"; 
import obrasRoutes from "./routes/obrasSociales.routes.js";
import especialidadesRoutes from "./routes/especialidades.routes.js";
import { router as medicosRouter } from './routes/medicos.routes.js';

dotenv.config();

const app = express();

await testConexion();

app.use(express.json());

app.use("/api/v1/obras-sociales", obrasRoutes);
app.use("/api/v1/especialidades", especialidadesRoutes);
app.use('/api/v1/medicos', medicosRouter);

app.get("/", (req, res) => {
    console.log("test get");
    res.status(200).send({ estado: "ok", msg: "API OK" });
});

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado OK en puerto ${PUERTO || 3000}`);
});