import DataRepository from "../repositories/data-repository.js";
import bcrypt from "bcrypt";

class AuthService{
    static async signIn({login,password}){
        const userData = await DataRepository.getUserData(login);
        
    
        if(!userData){
            throw new Conflict("Пользователь не найден");
        }

        const valid_pass = await bcrypt.compareSync(password,userData.password);
        console.log(valid_pass);
        if(!valid_pass){
            throw new Unauthorized("Неверный логин или пароль");
        }

        return {user_id: userData.id};
    }

    static async signUp({first_name, last_name, patronymic, login,password,director_id}){
        const userData = await DataRepository.getUserData(login);
    
        if(userData){
            throw new Conflict("Пользователь уже существует");
        }

        const hashed_pass = await bcrypt.hashSync(password,8);

        await DataRepository.createUser({first_name, last_name, patronymic, login,hashed_pass,director_id})
    }

}

export default AuthService;