
const mongoose  = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

    }catch(err){
        throw new Error('Error al tratar de conectar el servidor a la base de datos ' + err);
    }


};


module.exports = {
    dbConnection
}

















































/*const mongoose  = require('mongoose');

const dbConnection  = async() => {
    
    try {
        
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');

    } catch (error) {
        
        console.log(error);
        throw new Error('Error a la hora de utilizar la BD, ver logs');

    }

}
module.exports = {
    dbConnection
}*/