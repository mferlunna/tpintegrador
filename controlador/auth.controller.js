import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { buscarUsuarioPorEmail } from "../src/repositorios/auth.repository.js";

export const login = async (req, res) => {
    try {

        const { email, contrasenia } = req.body;

        const usuario = await buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario no encontrado"
            });
        }

        if (!usuario.contrasenia) {
            return res.status(500).json({
                msg: "Usuario sin contrasenia en base de datos"
            });
        }

        const valid = await bcrypt.compare(
            contrasenia,
            usuario.contrasenia
        );

        if (!valid) {
            return res.status(400).json({
                msg: "Contrasenia incorrecta"
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