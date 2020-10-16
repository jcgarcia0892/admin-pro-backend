
require('dotenv').config();
const express           = require('express');
const cors              = require('cors');
const { dbConnection }  = require('./database/config');

const app       = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

// clave del usuario prueba 1 en atlas D5XrLAyXrVKfs9Mh

app.listen(process.env.PORT, () => {
    console.log('hola estoy en el puerto ' + process.env.PORT)
});






































/*require('dotenv').config();

const express   = require('express');
const cors = require('cors');

const { dbConnection }    = require('./database/config');

//Crear el servidor de exprees
const app       = express();


//configurar CORS - esto es para configuar nuestra base de datos para que pueda ser accedida desde cualquier parte del mundo

app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

// Base de Datos
dbConnection();

//Este comando sirve para ver las variables de entorno incluyendo la que creamos en la carpeta .env
console.log(process.env);

//mean_user
//YQoWaxqMJM60NoQT



//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
} );
*/