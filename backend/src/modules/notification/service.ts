import { pool } from "../../config/db"

interface UserId {
    id: string
}

const userNotificationlist = async (userid: UserId) => {
    const data = await pool.query(
        `
        SELECT
            n.id AS notification_id,
            n.type AS notification_type,
            n.message,
            n.sent_at,
            m.name AS monitor_name,
            m.url AS monitor_url
        FROM notifications AS n
        LEFT JOIN monitors AS m
            ON n.monitor_id = m.id
        WHERE n.user_id = $1
        ORDER BY n.sent_at DESC;
        `,
        [userid.id]
    )
    console.log(data.rows, " this is notification data ");
    return data.rows
}

export default userNotificationlist