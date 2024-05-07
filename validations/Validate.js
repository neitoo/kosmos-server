import validatedRequest from "../utils/ValidatedRequest.js";
import * as Yup from "yup";

export const signInYup = Yup.object({
    body: Yup.object({
        login: Yup.string()
            .required("Обязательное поле.")
            .max(50, "Максимальная длина - 50 символов"),
        password: Yup.string()
            .required("Обязательное поле.")
            .min(5, "Минимальная длина - 5 символов")
            .max(60, "Максимальная длина - 60 символов"),
    }),
});

export const signUpYup = Yup.object({
    body: Yup.object({
        first_name: Yup.string().required("Поле обязательно!"),
        last_name: Yup.string().required("Поле обязательно!"),
        login: Yup.string()
            .required("Поле обязательно!")
            .max(50, "Максимальная длина - 50 символов"),
        password: Yup.string()
            .required("Поле обязательно!")
            .min(5, "Минимальная длина - 5 символов")
            .max(60, "Максимальная длина - 60 символов"),
    }),
});

class AuthValidator {
    static async signIn(req, res, next) {
        return validatedRequest(req, res, next, signInYup);
    }
    static async signUp(req, res, next) {
        return validatedRequest(req, res, next, signUpYup);
    }
}

export default AuthValidator;
