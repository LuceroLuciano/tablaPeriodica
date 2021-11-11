//login
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models/index');
//const elementUser = require('../models elementUser');

const user = db.user;

//llave privada para decifrar el token
const privateKey = 'Llav3PrivAda321.';
const {expireIn} = '1h';

exports.login = async(req, res)=>{
    try {
        
        const { body } = req;

        if(!body.email) 
            return res.status(404).send({ msg: 'Email is required' });
        if(!body.password) 
            return res.status(404).send({ msg: 'Password is required' });

        const elementUser = await user.findOne({
            where:{
                email: body.email,
                statusDelete: false,
            },
        });

        if(!elementUser)
            return res.status(404).send({ msg:'Credenciales invalidas' });
        
        //hace match y/o compara las contraseñas para
        //ver si son iguales
        if(!bcrypt.compareSync(body.password, elementUser.password))
            return res.status(404).send({ msg:'CREDENCIALES INVALIDAS' });

        //creando token    
        const response = {
            id: elementUser.id,
            name: elementUser.name,
            lastname: elementUser.lastname,
            role: elementUser.role,
        };

        //firmamos un token
        let token = jwt.sign(
        {
            user:response,
        },
            privateKey,
            expireIn
        );
        
        return res.status(200).send({
            user:response,
            token,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message);
    }
};