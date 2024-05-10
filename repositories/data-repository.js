import pool from "../database/db.js"

class DataRepository{
    static async createUser({first_name, last_name, patronymic, login, hashed_pass,director_id}){
        const response = await pool.query("INSERT INTO Users (first_name, last_name, patronymic, login, password,director_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
        [first_name, last_name, patronymic, login, hashed_pass,director_id]);

        return response.rows[0];
    }

    static async getUserData(login){
        const response = await pool.query("SELECT * FROM Users WHERE login=$1", [login]);

        if(!response.rows.length){
            return null;
        }

        return response.rows[0];
    }

    static async getInfoUser(id){
        const response = await pool.query("SELECT * FROM Users WHERE id=$1", [id]);

        return response.rows[0];
    }

    static async getUsers(){
        const response = await pool.query(
            "SELECT id, CONCAT(last_name, ' ', first_name, ' ', patronymic) AS fullname, login, director_id FROM Users"
        );

        return response.rows;
    }

    static async createTask({title,description,created_at,updated_at,priority,status,creator,assignee}){
        const response = await pool.query("INSERT INTO Tasks (title,description,due_date,created_at,updated_at,priority,status,creator,assignee) VALUES ($1,$2,NULL,$3,$4,$5,$6,$7,$8) RETURNING *;",
        [title,description,created_at,updated_at,priority,status,creator,assignee]);

        return response.rows[0];
    }

    static async getTaskById(id) {
        const query = `SELECT * FROM Tasks WHERE id=$1`;

        const response = await pool.query(query, [id]);
    
        return response.rows[0];
    }

    static async updateTaskById({id, description, due_date, updated_at, priority, status, assignee}) {
        const query = `
            UPDATE Tasks
            SET description = $2,
                due_date = $3,
                updated_at = $4,
                priority = $5,
                status = $6,
                assignee = $7
            WHERE id = $1
        `;
    
        const response = await pool.query(query, [id, description, due_date, updated_at, priority, status, assignee]);
    
        return response;
    }

    static async getAllTasks(){
        const query = `
                SELECT
                t.id,
                t.title,
                t.description,
                t.due_date,
                t.created_at,
                t.updated_at,
                p.name AS priority_name,
                s.name AS status_name,
                CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.patronymic) AS creator_name,
                CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.patronymic) AS assignee_name
            FROM Tasks t
            JOIN Priorities p ON t.priority = p.id
            JOIN Statuses s ON t.status = s.id
            JOIN Users u1 ON t.creator = u1.id
            JOIN Users u2 ON t.assignee = u2.id;
        `;
    
        const response = await pool.query(query);
    
        if (response.rows.length > 0) {
            return response.rows;
        } else {
            return null;
        }
    }
}

export default DataRepository;