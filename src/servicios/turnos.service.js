import pool from "../database/db.js";

// ─── Queries SQL ────────────────────────────────────────────────────────────

const SQL = {
    obtenerPacienteConObraSocial: `
        SELECT p.*, os.porcentaje_descuento, os.es_particular
        FROM pacientes p
        INNER JOIN obras_sociales os ON p.obra_social_id = os.id
        WHERE p.id = ? AND p.activo = 1
    `,
    obtenerMedico: `
        SELECT *
        FROM medicos
        WHERE id = ? AND activo = 1
    `,
    verificarTurnoOcupado: `
        SELECT id
        FROM turnos_reservas
        WHERE medico_id = ? AND fecha_hora = ? AND activo = 1
    `,
    verificarTurnoDuplicadoPaciente: `
        SELECT id
        FROM turnos_reservas
        WHERE paciente_id = ? AND fecha_hora = ? AND activo = 1
    `,
    insertarTurno: `
        INSERT INTO turnos_reservas
            (paciente_id, medico_id, fecha_hora, valor_total, atendido, activo)
        VALUES (?, ?, ?, ?, 0, 1)
    `,
    obtenerTurnoPorIdYMedico: `
        SELECT *
        FROM turnos_reservas
        WHERE id = ? AND medico_id = ? AND activo = 1
    `,
    marcarAtendido: `
        UPDATE turnos_reservas
        SET atendido = 1
        WHERE id = ?
    `,
    obtenerTurnosPorMedico: `
        SELECT *
        FROM turnos_reservas
        WHERE medico_id = ? AND activo = 1
        ORDER BY fecha_hora
    `,
    obtenerTurnosPorPaciente: `
        SELECT *
        FROM turnos_reservas
        WHERE paciente_id = ? AND activo = 1
        ORDER BY fecha_hora
    `,
};

// ─── Helpers de negocio ──────────────────────────────────────────────────────

const calcularValorTotal = (valorConsulta, esParticular, porcentajeDescuento) => {
    if (esParticular) return valorConsulta;
    return valorConsulta - valorConsulta * porcentajeDescuento;
};

const validarFechaFutura = (fechaHora) => {
    if (new Date(fechaHora) <= new Date()) {
        throw new Error("La fecha del turno debe ser futura");
    }
};

// ─── Validaciones con DB ─────────────────────────────────────────────────────

const obtenerPacienteOFallar = async (connection, pacienteId) => {
    const [rows] = await connection.query(SQL.obtenerPacienteConObraSocial, [pacienteId]);
    if (rows.length === 0) throw new Error("Paciente inexistente");
    return rows[0];
};

const obtenerMedicoOFallar = async (connection, medicoId) => {
    const [rows] = await connection.query(SQL.obtenerMedico, [medicoId]);
    if (rows.length === 0) throw new Error("Médico inexistente");
    return rows[0];
};

const validarDisponibilidadHorario = async (connection, medicoId, fechaHora) => {
    const [rows] = await connection.query(SQL.verificarTurnoOcupado, [medicoId, fechaHora]);
    if (rows.length > 0) throw new Error("Horario no disponible");
};

const validarSinTurnoDuplicado = async (connection, pacienteId, fechaHora) => {
    const [rows] = await connection.query(SQL.verificarTurnoDuplicadoPaciente, [pacienteId, fechaHora]);
    if (rows.length > 0) throw new Error("El paciente ya posee un turno en ese horario");
};

// ─── Servicios ───────────────────────────────────────────────────────────────

export const crearTurno = async (pacienteId, medicoId, fechaHora) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const paciente = await obtenerPacienteOFallar(connection, pacienteId);
        const medico = await obtenerMedicoOFallar(connection, medicoId);

        validarFechaFutura(fechaHora);
        await validarDisponibilidadHorario(connection, medicoId, fechaHora);
        await validarSinTurnoDuplicado(connection, pacienteId, fechaHora);

        const valorTotal = calcularValorTotal(
            medico.valor_consulta,
            paciente.es_particular,
            paciente.porcentaje_descuento
        );

        const [resultado] = await connection.query(SQL.insertarTurno, [
            pacienteId,
            medicoId,
            fechaHora,
            valorTotal,
        ]);

        await connection.commit();
        return resultado.insertId;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const marcarAtendido = async (turnoId, medicoId) => {
    const [rows] = await pool.query(SQL.obtenerTurnoPorIdYMedico, [turnoId, medicoId]);

    if (rows.length === 0) {
        throw new Error("No puede modificar este turno");
    }

    await pool.query(SQL.marcarAtendido, [turnoId]);
};

export const obtenerTurnosMedico = async (medicoId) => {
    const [rows] = await pool.query(SQL.obtenerTurnosPorMedico, [medicoId]);
    return rows;
};

export const obtenerTurnosPaciente = async (pacienteId) => {
    const [rows] = await pool.query(SQL.obtenerTurnosPorPaciente, [pacienteId]);
    return rows;
};