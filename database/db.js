import pg from "pg";

const pool = new pg.Pool({
    user: "",
    password: "",
    host: "localhost",
    port: 5432,
    database: "todokosmos"
});

export default pool;