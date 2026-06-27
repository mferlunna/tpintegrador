import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { specs, swaggerUi } from "./swagger.js";
import cors from "cors";
import { testConexion } from "./controlador/testconexion.js";
import obrasRoutes from "./routes/obrasSociales.routes.js";
import especialidadesRoutes from "./routes/especialidades.routes.js";
import { router as medicosRouter } from "./routes/medicos.routes.js";
import authRoutes from "./routes/auth.routes.js";
import turnosRoutes from "./routes/turnos.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import estadisticasRoutes from "./routes/estadisticas.routes.js";
import uploadRoutes from "./routes/upload.routes.js";



dotenv.config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("JWT_EXPIRES =", process.env.JWT_EXPIRES);

console.log("clinica");

const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/upload", uploadRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({origin: process.env.FRONTEND_URL,  credentials: true}));


await testConexion();


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/obras-sociales", obrasRoutes);
app.use("/api/v1/especialidades", especialidadesRoutes);
app.use("/api/v1/medicos", medicosRouter);
app.use("/api/v1/turnos", turnosRoutes);
app.use("/api/v1/pacientes", pacientesRoutes);
app.use("/api/v1/estadisticas", estadisticasRoutes);
app.use("/api/v1/uploads", express.static("uploads"));


app.get("/", (req, res) => {
    res.status(200).send({ estado: "ok", msg: "API OK" });
});


const PORT = process.env.PUERTO || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});