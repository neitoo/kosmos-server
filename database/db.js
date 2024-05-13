import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `postgres://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`
const pool = new pg.Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;