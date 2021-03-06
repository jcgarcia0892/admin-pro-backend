const { response }  = require('express');
const Usuario       = require('./../models/usuario');
const bcrypt        = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFront } = require('../helpers/menu-frontend');

const login = async(req, res = response) => {

    
    const { email, password } = req.body;
    try {
        
        const usuarioDB = await Usuario.findOne({email});

        //Verificar Email
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrador'
            });
        }

        //Verificar contraseña

        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        // GENERAR EL TOKEN

        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFront( usuarioDB.rol )
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const googleSignIn  = async(req, res = response) => {

    const googleToken   = req.body.token;
    
    try {
        
        
        const {name, email, picture}    = await googleVerify(googleToken);
        
        const usuarioDB = await Usuario.findOne({email});
        let usuario;
        
        if(!usuarioDB) {
            //No existe usuario
            usuario = await new Usuario({
                nombre: name,
                email,
                img: picture,
                password: '@@@',
                google: true
            });
        }else {

            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFront( usuario.rol )
        })
        
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'El token de google no es válido'
        });
    }

};


const renewToken    = async (req, res = response) => {

    const uid   = req.uid;
    const token = await generarJWT( uid );

    //Obtener usuario
    const usuarioDB = await Usuario.findById(uid);  
    console.log(usuarioDB);


    res.json({
        ok: true,
        token,
        usuarioDB,
        menu: getMenuFront( usuarioDB.rol )
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
};