import { pool } from "./conexion.js";


export default class Medicos {

    buscarTodos = async () => {
        const sql = "SELECT * FROM v_medicos";
        const [medicos] = await pool.execute(sql);
        return medicos;
    }

    buscarPorId = async (id_medico) => {
        const sql = `
            SELECT *
            FROM medicos
            WHERE id_medico = ?
        `;

        const [medico] = await pool.execute(sql, [id_medico]);

        return medico[0];
    }
    relacionarConEspecialidad = async (
    id_medico,
    especialidades
    )  => {

    const conexion = await pool.getConnection();

    try {

        await conexion.beginTransaction();

        for (const esp of especialidades) {

            const sqlExiste = `
                SELECT 1
                FROM medicos_especialidades
                WHERE id_medico = ?
                AND id_especialidad = ?
            `;

            const [relacion] = await conexion.execute(
                sqlExiste,
                [id_medico, esp.id_especialidad]
            );

            if (relacion.length > 0) {
                continue;
            }

            const sqlInsert = `
                INSERT INTO medicos_especialidades
                (
                    id_medico,
                    id_especialidad
                )
                VALUES
                (?, ?)
            `;

            await conexion.execute(
                sqlInsert,
                [
                    id_medico,
                    esp.id_especialidad
                ]
            );
        }

        await conexion.commit();

        return true;

    } catch (error) {

        await conexion.rollback();
        throw error;

    } finally {

        conexion.release();

    }
}

    obtenerObrasSociales = async (id_medico) => {

    const sql = `
        SELECT
            os.id_obra_social,
            os.nombre,
            os.descripcion,
            os.porcentaje_descuento,
            os.es_particular
        FROM obras_sociales os
        INNER JOIN medicos_obras_sociales mos
            ON os.id_obra_social = mos.id_obra_social
        WHERE mos.id_medico = ?
        AND mos.activo = 1
    `;

    const [obras] = await pool.execute(
        sql,
        [id_medico]
    );

    return obras;
}
    relacionarConObraSocial = async (id_medico, obras_sociales) => {

        const conexion = await pool.getConnection();

        try {

            await conexion.beginTransaction();

            for (const os of obras_sociales) {

                const sqlExiste = `
                    SELECT 1
                    FROM medicos_obras_sociales
                    WHERE id_medico = ?
                    AND id_obra_social = ?
                `;

                const [relacion] = await conexion.execute(
                    sqlExiste,
                    [id_medico, os.id_obra_social]
                );

                if (relacion.length > 0) {
                    continue;
                }

                const sqlInsert = `
                    INSERT INTO medicos_obras_sociales
                    (
                        id_medico,
                        id_obra_social
                    )
                    VALUES
                    (?, ?)
                `;

                await conexion.execute(
                    sqlInsert,
                    [id_medico, os.id_obra_social]
                );
            }

            await conexion.commit();

            return true;

        } catch (error) {

            await conexion.rollback();
            throw error;

        } finally {

            conexion.release();

        }
    }
}