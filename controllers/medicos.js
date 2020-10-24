const { response }  = require("express");
const Medico        = require('./../models/medico')

const getMedicos = async (req, res = response) => {
    

    const medicos = await Medico.find()
                    .populate('usuario', 'nombre email')
                    .populate('hospital', 'nombre img');;

    res.json({
        ok: true,
        medicos,
        msg: 'este es un mensaje'
    });

};

const crearMedico = async (req, res = response) => {
    

    const uid   = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body

    });

    try {
        const medicoDB = await medico.save();
        
        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado por favor hable con el administrador'
        });
    }


};

const actualizarMedico = async (req, res = response) => {

    const uid   = req.uid;
    const id    = req.params.id;

    try {
        const medico = await Medico.findById(id);
        if(!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El medico con ese id no existe'
            })
        }
    
        const actualizarDatos = {
            usuario: uid,
            ...req.body
        };
    
        const medicoActualizado = await Medico.findByIdAndUpdate(id, actualizarDatos, {new: true});
    
        res.json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado por favor hable con el administrador'
        })
    }

};

const borrarMedico = async (req, res = response) => {

    const id    = req.params.id;

    try {
        const medico = await Medico.findById(id);
        if(!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El medico con ese id no existe'
            })
        }

        await Medico.findByIdAndDelete(id);
    
        res.json({
            ok: true,
            msg: 'Medico borrado'
            
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado por favor hable con el administrador'
        });
    }
   

};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}