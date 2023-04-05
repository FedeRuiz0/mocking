import userDao from "../dao/users.dao.js";
import { hashPassword, isValidPass } from '../utils.js'

class UserValidator{
    async userLogin( email, password ){
        
        if( !email ) throw new Error('Email is required.');
        if( !password ) throw new Error('Password is required.');

        const user = await userDao.findByEmail(email);

        if(!user) throw new Error('User not found');

        if(!isValidPass(user, password)) throw new Error('Invalid password');

        return user;
    }

    async registerUser({first_name, last_name, email, age, password}){
        try{
            if( !first_name || !last_name || !age || !email || !password ) throw new Error('Missing required fields');

            // -- checks if there is an existing user with that email
            const user = await userDao.findByEmail(email);
            if(user) throw new Error('Email already in use');
            console.log('bajando al dao')
            const data = {
                first_name, 
                last_name, 
                age, 
                email, 
                password: hashPassword(password)
            };

            const newUser = await userDao.createUser(data)
            return newUser;
        }catch(err){
            return err;
        }
    }
}

export default new UserValidator();