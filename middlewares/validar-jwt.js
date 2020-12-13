const { response }  = require('express');
const jwt           = require('jsonwebtoken');
const Usuario       = require('./../models/usuario');

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
const validarAdminRole = async(req, res, next) => {

    const uid       = req.uid;
    
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        console.log(usuarioDB);
        if(usuarioDB.rol !== 'ADMIN_ROLE') {
            res.status(403).json({
                ok: false,
                msg: 'El usuario no tiene los privilegios correspondientes'
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


};

const validarAdminRoleOMismoUsuario = async(req, res, next) => {

    const uid       = req.uid;
    console.log(req.uid);
    console.log(req.params.id);
    const id        = req.params.id;
    
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        console.log(usuarioDB);
        if(usuarioDB.rol === 'ADMIN_ROLE' || uid === id) {
            console.log('ENTRO');
            next();
        }else {
            res.status(403).json({
                ok: false,
                msg: 'El usuario no tiene los privilegios correspondientes'
            });
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


};


module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUsuario
}