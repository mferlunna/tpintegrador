import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../src/middlewares/validarCampos.js';
import TransformarDTO from '../src/middlewares/transformarDTOS.js';
import MedicosControlador from '../controlador/medicos.controller.js';

const router = express.Router();

const medicosControlador = new MedicosControlador();
const transformarDTO = new TransformarDTO();

router.get(
    '/',
    medicosControlador.buscarTodos
);
router.get(
    '/:id_medico/obras-sociales',
    [
        param('id_medico')
            .isInt({ min: 1 })
            .withMessage(
                'El id_medico debe ser un entero positivo.'
            ),
        validarCampos
    ],
    medicosControlador.obtenerObrasSociales
);

router.post(
    '/:id_medico/obras-sociales',
    [
        param('id_medico')
            .notEmpty()
            .withMessage('El id_medico es obligatorio.')
            .isInt({ min: 1 })
            .withMessage(
                'El id_medico debe ser un entero positivo.'
            ),

        check('obras_sociales')
            .exists()
            .withMessage(
                'obras_sociales es obligatorio.'
            )
            .isArray({ min: 1 })
            .withMessage(
                'obras_sociales debe contener al menos un elemento.'
            ),

        check('obras_sociales.*.id_obra_social')
            .exists()
            .withMessage(
                'Cada obra social debe tener id_obra_social.'
            )
            .isInt({ min: 1 })
            .withMessage(
                'id_obra_social debe ser un entero positivo.'
            ),

        validarCampos
    ],
    transformarDTO.medicosAsociarDTO,
    medicosControlador.asociarMedicoObrasSociales
);

router.post(
    '/:id_medico/especialidades',
    [
        param('id_medico')
            .notEmpty()
            .withMessage('El id_medico es obligatorio.')
            .isInt({ min: 1 })
            .withMessage(
                'El id_medico debe ser un entero positivo.'
            ),

        check('especialidades')
            .exists()
            .withMessage(
                'especialidades es obligatorio.'
            )
            .isArray({ min: 1 })
            .withMessage(
                'especialidades debe contener al menos un elemento.'
            ),

        check('especialidades.*.id_especialidad')
            .exists()
            .withMessage(
                'Cada especialidad debe tener id_especialidad.'
            )
            .isInt({ min: 1 })
            .withMessage(
                'id_especialidad debe ser un entero positivo.'
            ),

        validarCampos
    ],
    transformarDTO.medicosEspecialidadesDTO,
    medicosControlador.asociarMedicoEspecialidades
);

export { router };