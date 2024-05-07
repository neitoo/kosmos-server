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
}

export default DataRepository;