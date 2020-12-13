/*
    /api/todo/:busqueda
*/

const { response }  = require("express");
const Usuario       = require('./../models/usuario');
const Medico       = require('./../models/medico');
const Hospital       = require('./../models/hospital');

const getTodo   = async (req, res = response) => {

    const busqueda  = req.params.busquedas;
    const regex     = new RegExp(busqueda, 'i');//Sirve para que la busqueda no sea tan estricta

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex})
    ]);

    try {
        

        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

const getDocumentosColeccion    = async (req, res = response) => {
    
    const busqueda  = req.params.busquedas;
    const tabla     = req.params.tablas;
    const regex     = new RegExp(busqueda, 'i');
    let data = [];


    try {

        switch( tabla ) {
            case 'medicos':
                data = await Medico.find( {nombre: regex} )
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital_id', 'nombre img');

            break;

            case 'hospitales':
                data = await Hospital.find( {nombre: regex} )
                                        .populate('usuario', 'nombre img');

                
            break;

            case 'usuarios':
                data = await Usuario.find( {nombre: regex} );
            break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser de usuarios - médicos u hospitales'
                });
                break;
        }
        
        res.status(200).json({
            ok: true,
            resultados: data
        });

    } catch (error) {
        console.log('error');
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}