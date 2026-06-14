import { body, validationResult } from "express-validator";

export const validarLogin = [
  body("email")
    .isEmail()
    .withMessage("Email inválido"),

  body("contrasenia")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),

  (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array()
      });
    }

    next();
  }
];