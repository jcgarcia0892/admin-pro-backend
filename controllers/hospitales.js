const { response }  = require("express");
const Hospital      = require('./../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales =  await Hospital.find()
                                    .populate('usuario', 'nombre email');

    res.json({
        ok: true,
        hospitales
    });

};

const crearHospital = async (req, res = response) => {
    //este uid viene del middelware validarJWT
    const uid       = req.uid;
    const hospital  = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB    = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el hospital. Por favor hable con el administrador'
        });
    }
    

};

const actualizarHospital = async (req, res = response) => {

    const id    = req.params.id;
    const uid    = req.uid;
    
  
    
    
    try {

        const hospital  = await Hospital.findById(id);
        if(!hospital) {
            return req.status(400).json({
                ok: false,
                msg: 'No se encontró un usuario con ese id'
            })
        }
    
        const cambiosHospital = {
            ...req.body,
            usuarioId: uid
        }
    
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new :true });

        res.json({
            ok: true,
            hospital: hospitalActualizado

        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, contacte con el administrador'
        });
    }
    

};

const borrarHospital = async (req, res = response) => {

    const id    = req.params.id;
    
    try {

        const hospital  = await Hospital.findById(id);
        if(!hospital) {
            return req.status(400).json({
                ok: false,
                msg: 'No se encontró un usuario con ese id'
            })
        }
        
        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El hospital ha sido eliminado'

        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, contacte con el administrador'
        });
    }

};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}