//routes
const express = require('express');

const enrutador = express.Router();

const element = require('../controllers/elements.js');
//const element = require('../controllers/user.js');
const user = require('../controllers/user.js');
const period = require('../controllers/period.js');
const group = require('../controllers/group.js');
const clasification = require('../controllers/clasification.js');

//rutas para elementos
enrutador
    .route('/element')
    .get(element.getElement)  //metodo para mostrar lo elementos
    .post(element.createElement); //metodo parra crear los elementod

enrutador
    .route('/element/:id')
    .put(element.updateElement)
    .delete(element.deleteElement); 

//rutas para usuarios
enrutador
    .route('/user')
    .get(user.getUser)  //metodo para mostrar lo elementod
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
    .put(period.updatePeriod)
    .delete(period.deletePeriod);

//rutas para grupo
enrutador
    .route('/group')
    .get(group.getGroup)
    .post(group.createGroup);

enrutador
    .route('/group/:id')
    .put(group.updateGroup)
    .delete(group.deleteGroup);


//ruta para clasificaion
enrutador
    .route('/clasification')
    .get(clasification.getClasification)
    .post(clasification.createClasification);

enrutador
    .route('/clasification/:id')
    .put(clasification.updateClasification)
    .delete(clasification.deleteClasification);

//este enrutador va a traer toda la información de las rutas disponibles
module.exports = enrutador; 