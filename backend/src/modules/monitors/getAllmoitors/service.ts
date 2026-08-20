import { pool } from "../../../config/db";
import { Monitor } from "../validation";

interface UserId {
    id: string;
}

const getAllUrl = async (user: UserId): Promise<Monitor[]> => {
    const query = `
        SELECT id,name, url, status 
        FROM monitors   
        WHERE user_id = $1
    `;
    
    const { rows } = await pool.query<Monitor>(query, [user.id]);
    return rows;
};

export default getAllUrl;