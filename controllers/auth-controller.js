import AuthService from "../services/auth-service.js";
import ErrorUtils from "../utils/Errors.js";

class AuthController {
    static async signIn(req, res) {
        const { login, password } = req.body;
        try {
            const { user_id } = await AuthService.signIn({login,password});
            return res
                .status(200)
                .json({user_id});
        } catch (err) {
            return ErrorUtils.catchError(res, err);
        }
    }

    static async signUp(req, res) {
        const {first_name, last_name, patronymic, login,password,director_id} = req.body;
        try {
            await AuthService.signUp({first_name, last_name, patronymic, login,password,director_id})

            return res
                .status(200)
                .json("OK");
        } catch (err) {
            return ErrorUtils.catchError(res, err);
        }
    }
}

export default AuthController;
