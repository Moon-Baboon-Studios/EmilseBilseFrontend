import { CreateUserDTO } from "../models/user/userInterface";
import http from "../http-common"

class UserService {

    getById(userId: string) {
        return http.get("/User/" + userId)
    }

    async createUser(data: any) {
        return http.post(decodeURI("/User/CreateUser"), data)
    }

    async login(data: any) {
        return http.post("/User/Login", data)
    }
}
export default new UserService();