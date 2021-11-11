//routes
const express = require('express');

const enrutador = express.Router();

const element = require('../controllers/elements.js');
//const element = require('../controllers/user.js');
const user = require('../controllers/user.js');
const period = require('../controllers/period.js');
const group = require('../controllers/group.js');
const clasification = require('../controllers/clasification.js');

//middleware
const {verifyToken} = require('../middleware/authorization.js')

const generalities = require('../controllers/generalities.js');

//rutas para elementos
enrutador
    .route('/element')
    .get(element.getElement)  //metodo para mostrar lo elementos
    .post(element.createElement); //metodo parra crear los elementod

enrutador
    .route('/element/:id')
    .put(verifyToken,element.updateElement)
    .delete(verifyToken,element.deleteElement); 

//rutas para usuarios
enrutador
    .route('/user')
    .get(verifyToken,user.getUser)  //metodo para mostrar lo elementod
    .post(user.createUser); //metodo parra crear los elementod

enrutador
    .route('/user/:id')
    .put(user.updateUser)
    .delete(user.deleteUser); 

//rutas para periodo
enrutador
    .route('/period')
    .get(period.getPeriod)
    .post(period.createPeriod);


enrutador
    .route('/period/:id')
    .put(verifyToken,period.updatePeriod)
    .delete(verifyToken,period.deletePeriod);

//rutas para grupo
enrutador
    .route('/group')
    .get(group.getGroup)
    .post(group.createGroup);

enrutador
    .route('/group/:id')
    .put(verifyToken,group.updateGroup)
    .delete(verifyToken,group.deleteGroup);


//ruta para clasificaion
enrutador
    .route('/clasification')
    .get(verifyToken,clasification.getClasification)
    .post(clasification.createClasification);

enrutador
    .route('/clasification/:id')
    .put(verifyToken,clasification.updateClasification)
    .delete(verifyToken,clasification.deleteClasification);
    //ejemplo de como verificar un role y middleware
    //.delete(verifyRole,verifyToken,clasification.deleteClasification);

//rutas para generalidades
enrutador
    .route('/login')
    .post(generalities.login);

//este enrutador va a traer toda la información de las rutas disponibles
module.exports = enrutador; 