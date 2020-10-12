const { response }  = require('express');
const jwt           = require('jsonwebtoken');

    let objPrueba = {
        nombre: 'Julio',
        apellido: 'Garcia',
        edad: 29,
        id: 123456,
        correo: 'hola@gmail.com'
    }

const validarJWT = (req, res = response, next) => {

    //leer el token
   

    const token = req.header('x-token');

    if(!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

        next();

        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'El token es invalido'
        });
    }

};


module.exports = {
    validarJWT
}