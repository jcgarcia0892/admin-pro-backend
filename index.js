
require('dotenv').config();

const express   = require('express');
const cors = require('cors');

const { dbConnection }    = require('./database/config');

//Crear el servidor de exprees
const app       = express();


//configurar CORS - esto es para configuar nuestra base de datos para que pueda ser accedida desde cualquier parte del mundo

app.use(cors());

// Base de Datos
dbConnection();

//Este comando sirve para ver las variables de entorno incluyendo la que creamos en la carpeta .env
console.log(process.env);

//mean_user
//YQoWaxqMJM60NoQT



//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
} );
