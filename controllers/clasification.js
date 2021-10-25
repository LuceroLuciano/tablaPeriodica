//const element = require("../models/element");
const db = require("../models/index");

const clasification = db.clasification;
const element = db.element;

exports.createClasification = async (req, res) => {
    try {
        const { body } = req;

        console.log("\n Esta entrando aqui\n");

        if(!body.nameClasification)
            return res.status(404).send({ message:'nameClasification is required' });

        const create = await clasification.create({
            nameClasification: body.nameClasification,            
        });
        return res.status(201).send({ message:'clasificacion creada correctamente' });

        
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getClasification = async (req, res) => {
    try {
        //hacer una busqueda
        
        const find = await clasification.findAll({            
            where: { statusDelete: false },
            include:{
                model: element,
            },
        });
        
        return res.status(200).send(find);

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateClasification = async (req, res) => {
    try {
        const {body, params} = req;

        if (!body)
            return res.status(400).send({ message: "Los datos son requeridos" });
        if (!body.nameClasification)
            return res.status(404).send({ message: "nameClasification es requerido" });

        const validate = await clasification.findOne({
            where:{ id: params.id },
        });

            if(!validate)
                return res.status(404).send({ message:"No se encontro clasificacion" });
            if(validate.statusDelete === true)
                return res.status(404).send({ message:"No se encontro clasificacion" });

        validate.nameClasification = body.nameClasification;
        validate.save();

        return res
            .status(200)
            .send({ message: "Grupo actualizado correctamente" });

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteClasification = async (req, res) => {
    try {
        const { id } = req.params;

        const find = await clasification.findByPk(id);

        if (!find)
            return res.status(404).send({ message: "No se encontro clasificacion" });
        if (find.statusDelete === true)
            return res.status(404).send({ message: "No se encontro clasificacion" });

        find.statusDelete = true;
        find.save();
            
        return res.status(200).send({message:'clasificacion eliminado correctamente'});
            
    } catch (error) {
        return res.status(500).send(message.error);
    };
};