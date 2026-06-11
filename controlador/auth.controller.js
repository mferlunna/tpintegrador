import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../src/db/conexion.js";

export const login = async (req, res) => {
    try {
        const { email, contrasenia } = req.body;

        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE email = ? AND activo = 1",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({
                msg: "Usuario no encontrado"
            });
        }

        const usuario = rows[0];

        const valid = await bcrypt.compare(
            contrasenia,
            usuario.contrasenia
        );

        if (!valid) {
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES || "1d"
            }
        );

        return res.json({
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

        return res.status(500).json({
            msg: "Error en login"
        });
    }
};