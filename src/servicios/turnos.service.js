import pool from "../database/db.js";

//prueba de crear turno
export const crearTurno = async (
    pacienteId,
    medicoId,
    fechaHora
) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [paciente] = await connection.query(
            `
            SELECT p.*, os.porcentaje_descuento, os.es_particular
            FROM pacientes p
            INNER JOIN obras_sociales os
                ON p.obra_social_id = os.id
            WHERE p.id = ? AND p.activo = 1
            `,
            [pacienteId]
        );
        if (paciente.length === 0) {
            throw new Error("Paciente inexistente");
        }
        const [medico] = await connection.query(
            `
            SELECT *
            FROM medicos
            WHERE id = ? AND activo = 1
            `,
            [medicoId]
        );
        if (medico.length === 0) {
            throw new Error("Médico inexistente");
        }

        const [turnoExistente] = await connection.query(
            `
            SELECT id
            FROM turnos_reservas
            WHERE medico_id = ?
            AND fecha_hora = ?
            AND activo = 1
            `,
            [medicoId, fechaHora]
        );
        if (turnoExistente.length > 0) {
            throw new Error("Horario no disponible");
        }
        const fechaSeleccionada = new Date(fechaHora);
        if (fechaSeleccionada <= new Date()) {
            throw new Error(
                "La fecha del turno debe ser futura"
            );
        }
        let valorTotal;
        if (paciente[0].es_particular === 1) {

            valorTotal = medico[0].valor_consulta;
        } else {
            valorTotal =
                medico[0].valor_consulta -
                (
                    medico[0].valor_consulta *
                    paciente[0].porcentaje_descuento
                );
        }
        const [resultado] = await connection.query(
            `
            INSERT INTO turnos_reservas
            (
                paciente_id,
                medico_id,
                fecha_hora,
                valor_total,
                atendido,
                activo
            )
            VALUES (?, ?, ?, ?, 0, 1)
            `,
            [
                pacienteId,
                medicoId,
                fechaHora,
                valorTotal
            ]
        );
        await connection.commit();
        return resultado.insertId;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

//atendido
export const marcarAtendido = async (
    turnoId,
    medicoId
) => {

    const [turno] = await pool.query(
        `
        SELECT *
        FROM turnos_reservas
        WHERE id = ?
        AND medico_id = ?
        AND activo = 1
        `,
        [turnoId, medicoId]
    );
    if (turno.length === 0) {
        throw new Error(
            "No puede modificar este turno"
        );
    }
    await pool.query(
        `
        UPDATE turnos_reservas
        SET atendido = 1
        WHERE id = ?
        `,
        [turnoId]
    );
};
//lista turno medico
export const obtenerTurnosMedico = async (medicoId) => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM turnos_reservas
        WHERE medico_id = ?
        AND activo = 1
        ORDER BY fecha_hora
        `,
        [medicoId]
    );

    return rows;
};
//lista turno paciente
export const obtenerTurnosPaciente = async (
    pacienteId
) => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM turnos_reservas
        WHERE paciente_id = ?
        AND activo = 1
        ORDER BY fecha_hora
        `,
        [pacienteId]
    );

    return rows;
};
//no doble turno para el mismo paciente en el mismo horario
const [duplicado] = await connection.query(
    `
    SELECT id
    FROM turnos_reservas
    WHERE paciente_id = ?
    AND fecha_hora = ?
    AND activo = 1
    `,
    [pacienteId, fechaHora]
);

if (duplicado.length > 0) {
    throw new Error(
        "El paciente ya posee un turno en ese horario"
    );
}