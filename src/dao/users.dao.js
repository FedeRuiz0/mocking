import { userModel } from "../models/user.model.js";

class UserDao{
    createUser({first_name, last_name, email, age, password}){
        console.log('estoy en el dao')
        return userModel.create({first_name: first_name, last_name: last_name, email: email, age: age, password: password});
    }

    findByEmail(email){
        return userModel.findOne({email});
    }
}

export default new UserDao();