import DataRepository from "../repositories/data-repository.js";
import ErrorUtils from "../utils/Errors.js";

class DataController{
    static async getInfoUser(req,res){
        const {id} = req.body;

        try {
            const data = await DataRepository.getInfoUser(id);

            const {first_name, last_name, patronymic, director_id} = data;

            return res.status(200).json({first_name, last_name, patronymic, director_id});
        } catch (e) {
            return ErrorUtils.catchError(res,e)
        }
    }

    static async setTasks(req,res){
        const {title,description,priority,status,creator,assignee} = req.body;

        try {
            const date = new Date().toISOString();
            let [created_at, updated_at] = [date,date];

            const data = await DataRepository.createTask({title,description,created_at, updated_at, priority,status,creator,assignee});

            const {id} = data;

            return res.status(200).json({"ID": id});
        } catch (e) {
            return ErrorUtils.catchError(res,e)
        }
    }

    static async getTaskById(req,res){
        const {id} = req.body;

        try {
            const data = await DataRepository.getTaskById(id)
            const {id,title,description,due_date,created_at,updated_at,priority,status,creator,assignee} = data;
            return res.status(200).json({id,title,description,due_date,created_at,updated_at,priority,status,creator,assignee});
        } catch (e) {
            return ErrorUtils.catchError(res,e)
        }
    }

    static async getTasks(req,res){
        try {
            const data = await DataRepository.getAllTasks()
            return res.status(200).json(data);
        } catch (e) {
            return ErrorUtils.catchError(res,e)
        }
    }
}

export default DataController;