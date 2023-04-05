import UserValidator from "../validators/user.validator.js";
import { admin } from '../utils.js';
import jwt from 'jsonwebtoken';

class SessionController{
    async login(req, res){
        try{
            const { email, password } = req.body;
            let user = {};

            if(email == admin.user && password == admin.password){
                user = {...admin}
            }else{
                user = await UserValidator.userLogin(email, password);
            }

            const token = jwt.sign({email, first_name: user.first_name, last_name: user.last_name, role: user.role }, 'pageSecret', { expiresIn: '10m' });
            res.status(200).cookie('secretToken', token, {maxAge: 10000, httpOnly: true})
            res.redirect('/products');
        }catch(err){
            return res.status(400).json({error: err.message});
        }
    } 

    async register(req, res){
        try{
            const { first_name, last_name, age, email, password } = req.body;

            const user = await UserValidator.registerUser({first_name, last_name, email, age, password});
            res.status(201).redirect('/login');
        }catch(err){
            res.status(400).json({error: err.message})
        }
    }

    async current(req, res){
        res.send(req.user);
    }

    async handleLogout(req, res){
        res.clearCookie('secretToken');
        res.redirect('/login');
    }
}

export default new SessionController();