/* 
    Ruta: /api/hospitales
*/

const { Router }        = require('express');
const { check }         = require('express-validator');
const { validarCampos } = require('./../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();


//no se ejecuta la funcion get usuarios solo se manda la referencia
router.get('/', getHospitales );



router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
    );

router.put('/:id',
        [
            validarJWT,
            check('nombre', 'El nombre del hospital es obligatorio'),
            validarCampos
        ],            
        actualizarHospital
        );

router.delete('/:id', [validarJWT], borrarHospital );




module.exports = router;