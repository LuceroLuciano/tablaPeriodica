//valida el token
const jwt = require('jsonwebtoken');

const privateKey = 'Llav3PrivAda321.';

exports.verifyToken = async(req, res, next) =>{
    try {
        const token = req.get('token');

        const decode = jwt.verify(token, privateKey);

        req.user = decode.user;

        next();

    } catch (error) {
        return res.status(200).send({msg:'Token no es valido'});
    }
};

//roles
exports.verifyRole = async(req, res, next) =>{
    try {
        const token = req.get('token');

        const decode = jwt.verify(token, privateKey);

        req.user = decode.user;

        //validacion
        if(decode.user.role!==3)res.status(200).send({ msg: 'permisos denegados' })
                

        next();

    } catch (error) {
        return res.status(200).send({msg:'Token no es valido'});
    }
};
