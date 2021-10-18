//un controlador es un edpoint y se hace un edpoin para cada metodo
const db = require("../models/index");
/* const { param } = require("../routes/routes"); */

const element = db.element;

exports.createElement = async (req, res) => {
    try {
        const { body } = req;      
        
        if(!body.name) 
            return res.status(404).send({ message:'name is required' });
        if(!body.atomicNumber) 
            return res.status(404).send({ message:'atomicNumber is required' });
        if(!body.symbol) 
            return res.status(404).send({ message:'symbol is required' })
        if(!body.atomicMass) 
            return res.status(404).send({ message:'atomicMass is required' });


        const create = await element.create({
            name: body.name,
            atomicNumber: body.atomicNumber,
            symbol: body.symbol,
            atomicMass: body.atomicMass,           

        });
        
        return res.status(201).send({ message: 'Elemento creado correctamente' });

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getElement = async (req, res) => {
    try {
        //hacer una busqueda
        const find = await element.findAll({
            where: { statusDelete: false },
        });
        
        return res.status(200).send(find);

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateElement = async (req, res) => {
    try {
        const {body, params} = req;

        if (!body)
            return res.status(400).send({ message:"Los datos son requeridos" });
        if (!body.name)
            return res.status(404).send({ message: "name is required" });
        if (!body.atomicNumber)
            return res.status(404).send({ message: "atomNumber is required" });
        if (!body.symbol)
            return res.status(404).send({ message: "symbol is required" });
        if (!body.atomicMass)
            return res.status(404).send({ message: "atomicMass is required" });
        
        const validate = await element.findOne({
            where:{ id: params.id },
        });

        if(!validate)
            return res.status(404).send({ message:'No se encntro elemento' });
        if(validate.statusDelete === true) // si existe pero esta eliminado en la BD
            return res.status(404).send({ message: "No se encontro elemento" });

        validate.name = body.name;
        validate.atomicNumber = body.atomicNumber;
        validate.symbol = body.symbol;
        validate.atomicMass = body.atomicMass;
        validate.save();

        return res
            .status(200)
            .send({ message: "Elemento actualizado correctamente" });

    } catch (error) {
        return res.status(500)(message.error);
    }
}; 


exports.deleteElement = async (req, res) => {
    try {
        const { id } = req.params;

        const find = await element.findByPk(id);

        if (!find)
            return res.status(404).send({ message: "No se encontro elemento" });
        if (find.statusDelete === true)
            return res.status(404).send({ message: "No se encontro comunidad" });

        find.statusDelete = true;
        find.save();
            
        return res.status(200).send({message:'elemento eliminado correctamente'});
            
    } catch (error) {
        return res.status(500).send(message.error);
    };
};