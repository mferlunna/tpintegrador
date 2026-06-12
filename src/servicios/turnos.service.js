const db = require('../config/db');

const turnosController = {
    
    // 1. CREAR RESERVA
    crearReserva: async (req, res) => {
        const { id_medico, id_paciente, id_obra_social, fecha_hora } = req.body;

        try {
            // REGLA DE NEGOCIO: Verificar que el médico exista y esté ACTIVO
            const [medicos] = await db.query(
                'SELECT valor_consulta, activo FROM medicos WHERE id_medico = ? AND activo = 1', 
                [id_medico]
            );
            if (medicos.length === 0) {
                return res.status(404).json({ message: 'Médico no encontrado o inactivo.' });
            }
            const medico = medicos[0];

            // REGLA DE NEGOCIO: Verificar obra social
            const [obrasSociales] = await db.query(
                'SELECT porcentaje_descuento, es_particular, activo FROM obras_sociales WHERE id_obra_social = ? AND activo = 1', 
                [id_obra_social]
            );
            if (obrasSociales.length === 0) {
                return res.status(404).json({ message: 'Obra Social no encontrada o inactiva.' });
            }
            const obraSocial = obrasSociales[0];

            // REGLA DE NEGOCIO
            let valor_total = 0;
            const valorConsulta = parseFloat(medico.valor_consulta);
            const porcentajeDescuento = parseFloat(obraSocial.porcentaje_descuento);

            if (obraSocial.es_particular === 0) {
                // Si NO es particular, se aplica el descuento: valor_consulta - (descuento * valor_consulta)
                valor_total = valorConsulta - (porcentajeDescuento * valorConsulta); [cite: 125]
            } else {
                // Si SÍ es particular, el valor es directo
                valor_total = valorConsulta; [cite: 126]
            }

            // Insertar el turno en la base de datos
            const queryInsert = `
                INSERT INTO turnos_reservas 
                (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo) 
                VALUES (?, ?, ?, ?, ?, 0, 1)
            `;
            const [resultado] = await db.query(queryInsert, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]);

            return res.status(201).json({
                message: 'Reserva creada con éxito.',
                id_turno_reserva: resultado.insertId,
                valor_total: valor_total
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor al crear la reserva.' }); [cite: 139]
        }
    },

    // 2. LISTAR TURNOS PROPIOS
    listarTurnosPaciente: async (req, res) => {
        const id_usuario_autenticado = req.user.id; 

        try {
            // Buscamos el id_paciente asociado a este usuario
            const [pacientes] = await db.query('SELECT id_paciente FROM pacientes WHERE id_usuario = ?', [id_usuario_autenticado]);
            if (pacientes.length === 0) {
                return res.status(404).json({ message: 'Paciente no encontrado.' });
            }
            const id_paciente = pacientes[0].id_paciente;

            // REGLA DE NEGOCIO: Traer solo turnos del paciente que estén ACTIVO = 1
            const queryTurnos = `
                SELECT id_turno_reserva, id_medico, fecha_hora, valor_total, atentido 
                FROM turnos_reservas 
                WHERE id_paciente = ? AND activo = 1 
                ORDER BY fecha_hora ASC
            `; [cite: 128]
            
            const [turnos] = await db.query(queryTurnos, [id_paciente]);
            return res.status(200).json(turnos);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al obtener los turnos.' }); [cite: 139]
        }
    },

    //SOFT DELETE
    cancelarReserva: async (req, res) => {
        const { id } = req.params;

        try {
            const querySoftDelete = 'UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ? AND activo = 1'; [cite: 127, 128]
            const [resultado] = await db.query(querySoftDelete, [id]);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: 'El turno no existe o ya fue cancelado.' });
            }

            return res.status(200).json({ message: 'Reserva cancelada correctamente (Soft Delete aplicado).' }); [cite: 127]

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al intentar cancelar la reserva.' }); [cite: 139]
        }
    }
};

module.exports = turnosController;