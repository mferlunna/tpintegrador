import express from "express";
import dotenv from "dotenv";

import { testConexion } from "./controlador/testconexion.js";
import obrasRoutes from "./routes/obrasSociales.routes.js";
import especialidadesRoutes from "./routes/especialidades.routes.js";
import { router as medicosRouter } from "./routes/medicos.routes.js";
import authRoutes from "./routes/auth.routes.js";


dotenv.config();

console.log("clinica");

const app = express();

// Middleware
app.use(express.json());

// Test DB (solo una vez al inicio)
await testConexion();

// Rutas
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/obras-sociales", obrasRoutes);
app.use("/api/v1/especialidades", especialidadesRoutes);
app.use("/api/v1/medicos", medicosRouter);

// Test endpoint
app.get("/", (req, res) => {
    res.status(200).send({ estado: "ok", msg: "API OK" });
});

// Server
const PORT = process.env.PUERTO || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});