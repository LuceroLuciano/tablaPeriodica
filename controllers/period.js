//const element = require("../models/element");
const db = require("../models/index");

const period = db.period;
const element = db.element;

exports.createPeriod = async (req, res) => {
    try {
        const { body } = req;

        console.log("\n Esta entrando aqui\n");

        if(!body.numPeriod)
            return res.status(404).send({ message:'numPeriod is required' });

        const create = await period.create({
            numPeriod: body.numPeriod,            
        });
        return res.status(201).send({ message:'periodo creado correctamente' });

        
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getPeriod = async (req, res) => {
    try {
        //hacer una busqueda
        
        const find = await period.findAll({            
            where: { statusDelete: false },
            include: {
                model: element,
            },
        });
        
        return res.status(200).send(find);

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updatePeriod = async (req, res) => {
    try {
        const {body, params} = req;

        if (!body)
            return res.status(400).send({ message: "Los datos son requeridos" });
        if (!body.numPeriod)
            return res.status(404).send({ message: "numPeriod es requerido" });

        const validate = await period.findOne({
            where:{ id: params.id },
        });

            if(!validate)
                return res.status(404).send({ message:"No se encontro periodo" });
            if(validate.statusDelete === true)
                return res.status(404).send({ message:"No se encontro elemento" });

        validate.numPeriod = body.numPeriod;
        validate.save();

        return res
            .status(200)
            .send({ message: "Periodo actualizado correctamente" });

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deletePeriod = async (req, res) => {
    try {
        const { id } = req.params;

        const find = await period.findByPk(id);

        if (!find)
            return res.status(404).send({ message: "No se encontro periodo" });
        if (find.statusDelete === true)
            return res.status(404).send({ message: "No se encontro periodo" });

        find.statusDelete = true;
        find.save();
            
        return res.status(200).send({message:'periodo eliminado correctamente'});
            
    } catch (error) {
        return res.status(500).send(message.error);
    };
};