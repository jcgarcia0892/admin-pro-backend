const { response }  = require('express');
const Usuario       = require('./../models/usuario');
const bcrypt        = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const desde  = Number(req.query.desde) || 0;

    
    //const usuarios = await Usuario.find({}, 'nombre email rol google')
    //                                .skip(desde)//eto es para la paginación, se salta los valores desde el numero que viene
    //                                .limit(5);   //en la variable desde, los cuales se ponen en la ruta del postman como parametros
    
    //const total = await Usuario.count(); //Sirve para contar los usuarios que tenemos en la vase de datos

    const [usuarios, total]    = await Promise.all([
        Usuario.find({}, 'nombre email rol google, img')
                .skip(desde)
                .limit(5),
        
        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total
    });

};


const crearUsuario = async(req, res = response) => {

    const { password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg:'Ese correo ya existe'
            });
        }


        const usuario       = new Usuario( req.body );

        const salt          = bcrypt.genSaltSync();
        usuario.password    = bcrypt.hashSync( password, salt );

        await usuario.save();
        // GENERAR TOKEN
        const token = await generarJWT( usuario.uid );

        res.json({
            ok: true,
            usuario,
            token

            
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    };



};




const actualizarUsuario = async (req, res = response) => {
        //TODO: Validar token y comprobar si es el usuario correcto
    
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        // Actualizaciones
        const {password, google, email, ...campos}    = req.body;

        if(usuarioDB.email !== email){
            
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                })
            }

        }
        campos.email = email;
        const usuarioActualizado    = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            usuario: usuarioActualizado

        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }

};

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    res.status(200).json({
        ok: true,
        msg: 'Hola soy un delete creado por julio',
        uid
    })

};


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}