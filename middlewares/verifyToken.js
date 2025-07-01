import jwt from 'jsonwebtoken'
import UserModel from '../Models/User_Model.js';

// middleware function for verify the token
function verifyToken(req, res, next){
    const auth = req.headers.authorization;
    // if request has headers and JWT bearer then verify the token
    if(req.headers && auth && auth.split(" ")[0] === 'JWT'){
       jwt.verify(auth.split(" ")[1], 'internshalaCapstone', function(err, decodedData){
        if(err){
            return res.status(403).json({message: 'INVALID TOKEN!'})
        }
        // sending the user to the request if token is verified
        UserModel.findById(decodedData.id).then(user => {
            req.user = user;
            next();
        }).catch(err => res.status(500).json({error: err.message}))
       })
    }else{
        return res.status(404).json({message: "TOKEN NOT FOUND!"})
    }
}

export default verifyToken;