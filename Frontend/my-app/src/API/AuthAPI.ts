import axios from "axios";
import { LoginForm } from "../components/AuthArea/Login/Login";
import { RegisterForm } from "../components/AuthArea/Register/Register";
import config from "../Utils/Config";

export interface AuthForm {

    firstName: string;
    lastName: string;
    email: string;
    password1: string;
    password2: string;

}
interface LoginBack {
    username: string;
    password: string;
}
export interface Tokens {
    refresh: string;
    access: string;

}

class AuthAPI{

    public async register(form: RegisterForm) {
        return await new  Promise<{data:Tokens}>(async (resolve,reject) =>{
            
            await axios.post<Tokens>(config.registerUrl,form)
                .then((response) =>  resolve({data: response.data}))
                .catch((error) => reject(error.request.response))
          
        });
    }
    public async login(form: LoginForm) {
        return await new  Promise<{data: Tokens}>(async (resolve,reject) =>{
            
            let backForm:LoginBack = {username:form.email, password:form.password}
            await axios.post<Tokens>(config.loginUrl, backForm)
                .then((response) =>  resolve({data: response.data}))
                .catch((error) => reject(error.request.response))
          
        });
    }
    public async postRefresh(token: string) {
        return await new  Promise<{data: {access:string}}>(async (resolve,reject) =>{

            await axios.post<{access:string}>(config.tokenRefreshUrl, {'refresh':token})
                .then((response) =>  resolve({data: response.data}))
                .catch((error) => reject(error.request.response))
          
        });
    }

}


const authAPI = new AuthAPI();
export default authAPI