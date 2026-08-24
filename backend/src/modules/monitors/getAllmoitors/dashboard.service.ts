import { pool } from "../../../config/db";

const URLStatus = async (userid: { id: string }) => {
    const data = await pool.query(
        `
        SELECT
            m.name,
            m.url,
            ml.http_status
        FROM monitors AS m
        JOIN monitor_logs AS ml
            ON ml.monitor_id = m.id
        WHERE m.user_id = $1
        ORDER BY ml.checked_at DESC
        `,
        [userid.id]
    );
    return data.rows;
};

export  default URLStatus;


