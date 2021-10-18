const db = require('../models/index')

const user = db.user; 

exports.createUser = async (req, res) => {
    try {
        const { body } = req;
        
        console.log("\n ESTA ENTRANDO AQUI \n");

        if(!body.name)
            return res.status(404).send({ message:'name is required' });            
        if(!body.lastname)
            return res.status(404).send({ message:'lastname is requires' });
        if(!body.email)
            return res.status(404).send({ message:'email is requires' });
        if(!body.password)
            return res.status(404).send({ message:'password is requires' });
        if(!body.role)
            return res.status(404).send({ message:'role is requires' });
            
        const create = await user.create({
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            role: body.role,            
        });
        return res.status(201).send({ message:'usuario creado correctamente' });
    
    } catch (error) {
        return res.status(500).send(message.error);
        //return res.status(500).send(message.error);
    }
};

exports.getUser = async (req, res) => {
    try {
        //hacer una busqueda
        
        const find = await user.findAll({
            where: { statusDelete: false },
        });
        
        return res.status(200).send(find);

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {body, params} = req;

        if(!body)
            return res.status(400).send({ message:'Los datos son requeridos' });
        if(!body.name)
            return res.status(404).send({ message: "name is required" });
        if(!body.lastname)
            return res.status(404).send({ message: "lastname is required" });
        if(!body.email)
            return res.status(404).send({ message: "email is required" });
        if(!body.password)
            return res.status(404).send({ message: "password is required" });
        if(!body.role)
            return res.status(404).send({ message: "role is required" });
        
            const validate = await user.findOne({
                where:{ id: params.id },
            });
    
            if(!validate)
                return res.status(404).send({ message:'No se encntro usuario' });
            if(validate.statusDelete === true) // si existe pero esta eliminado en la BD
                return res.status(404).send({ message: "No se encontro usuario" });

        validate.name = body.name;
        validate.lastname = body.lastname;
        validate.email = body.email;
        validate.password = body.password;
        validate.role = body.role;
        validate.save();
            
        return res
                .status(200)
                .send({ message: "Usuario actualizado corrctamente" });

    } catch (error) {
        return res.status(500).send(message.error);        
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const find = await user.findByPk(id)
        if (!find) 
            return res.status(404).send({ message:"El usuario no existe" });
        if (find.statusDelete === true) 
            return res.status(404).send({ message:"El usuario no existe" });

        find.statusDelete = true;
        find.save();

        return res.status(200).send({ message: "Usuario eliminado correctamente" });
    
    } catch (error) {
        return res.status(200).send(message.error);
    };
};