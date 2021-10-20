//const element = require("../models/element");
const db = require("../models/index");

const group = db.group;

exports.createGroup = async (req, res) => {
    try {
        const { body } = req;

        console.log("\n Esta entrando aqui\n");

        if(!body.numGroup)
            return res.status(404).send({ message:'numGroup is required' });

        const create = await group.create({
            numGroup: body.numGroup,            
        });
        return res.status(201).send({ message:'grupo creado correctamente' });

        
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getGroup = async (req, res) => {
    try {
        //hacer una busqueda
        
        const find = await group.findAll({            
            where: { statusDelete: false },
        });
        
        return res.status(200).send(find);

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const {body, params} = req;

        if (!body)
            return res.status(400).send({ message: "Los datos son requeridos" });
        if (!body.numGroup)
            return res.status(404).send({ message: "numGroup es requerido" });

        const validate = await group.findOne({
            where:{ id: params.id },
        });

            if(!validate)
                return res.status(404).send({ message:"No se encontro grupo" });
            if(validate.statusDelete === true)
                return res.status(404).send({ message:"No se encontro grupo" });

        validate.numGroup = body.numGroup;
        validate.save();

        return res
            .status(200)
            .send({ message: "Grupo actualizado correctamente" });

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const find = await group.findByPk(id);

        if (!find)
            return res.status(404).send({ message: "No se encontro grupo" });
        if (find.statusDelete === true)
            return res.status(404).send({ message: "No se encontro grupo" });

        find.statusDelete = true;
        find.save();
            
        return res.status(200).send({message:'grupo eliminado correctamente'});
            
    } catch (error) {
        return res.status(500).send(message.error);
    };
};