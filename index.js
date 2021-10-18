// hacer peticiones a un servidor
const express = require('express');
const morgan = require('morgan');
const enrutador = require('./routes/routes');
const db = require('./models/index.js');

// inicializar express
const app = express();

//db.sequelize.sync();

db.sequelize.sync();

//para eliminar las tablas o vaciar y aplicar nuevos cambios

/* db.sequelize.sync({ force: true }).then(() => {
    console.log("Tablas restablecidas");
}); */


// un servidor esta compuesto de lo siguiente
// middlewares -routes -static files y -start server
app.use(morgan('dev'));

// acepta 50mb como limite de información para que el 
// servido no se cuelgue
app.use(express.json({limit:'50mb'}));

// routes
// metodos http -post -get -put -delete

app.use('/api/tablaPeriodica',enrutador);

//static files

//staart server
app.listen(8080, ()=>{
    console.log('el servidor esta conrriendo en el puerto', 8080);
});
















//¿Qué pasa si no me muestra mis dependencias?
//la libreria se busca e instalan con npm
//no se instala el package.lock.json