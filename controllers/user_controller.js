import UserModel from "../Models/User_Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// function for creating a new user document
export function registerUser(req, res){

    const {username, email, password} = req.body;

    // Email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password regex (min 6 characters, at least one number)
    const passwordRegex = /^(?=.*[0-9]).{6,}$/;

    // Validate email
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Invalid email format. Email must contain "@" and a valid domain name (e.g., example@domain.com).'
        });
    }

    // Validate password
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long and contain at least one number.'
        });
    }

    // register the user if user matching with email does not exist
    UserModel.findOne({email}).then(user => {
        if(user){
            return res.status(409).json({message: 'User already exists!'})
        }else{
            // creating a new user in database and storing hashed password in DB
            UserModel.create({username, email, password: bcrypt.hashSync(password, 10)})
            .then(() => {
                return res.status(201).json({message: 'User has been registered!'})
            })
            .catch(err => {
                return res.status(500).json({message: 'Unable to register user',
                    error: err.message
                })
            }) 
        }
    })
    .catch(err => {
        return res.status(500).json({
            message: 'Unable to Register! Kindly try again later!',
            error: err.message
        })
    })
}

// function for handling the login feature
export function loginUser(req, res){
    
    // we need only email and password for login
    const {email, password} = req.body;

    // if the user with matching email does not exist show the error
    UserModel.findOne({email}).then(user => {
        if(!user){
            return res.status(404).json({message: 'INVALID EMAIL ADDRESS!!'})
        }
        // creating JWT token when user logs in
        const token = jwt.sign({id: user._id}, 'internshalaCapstone', {expiresIn: '120m'});

        // comparing input password and hashed password that we stored in the database
        const isPasswordMatched = bcrypt.compareSync(password, user.password);
        if(!isPasswordMatched){
          return res.status(404).json({message: 'WRONG PASSWORD!!'})
        }else{
          // if the password match return the user details except the password
          return res.status(200).json({
            message: "Login Successfull",
            username: user.username,
            email: user.email,
            accessToken: token
          })
        }
    })
    .catch(err => {
        return res.status(500).json({
            message: 'Unable to Login! Kindly try again later!',
            error: err.message
        })
    })
};