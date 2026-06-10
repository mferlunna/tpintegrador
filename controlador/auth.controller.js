import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../src/db/conexion.js";

export const login = async (req, res) => {
    try {
        console.log("BODY:", req.body); 

        const { email, contrasenia } = req.body;

        // 1. Buscar usuario
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE email = ? AND activo = 1",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        const usuario = rows[0];

        // 2. Verificar contraseña
        const valid = await bcrypt.compare(
            contrasenia,
            usuario.contrasenia
        );

        if (!valid) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        // 3. Crear token JWT
        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || "1d" }
        );

        // 4. Respuesta
        res.json({
            token,
            usuario: {
                id: usuario.id_usuario,
                nombres: usuario.nombres,
                apellido: usuario.apellido,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en login" });
    }
};

