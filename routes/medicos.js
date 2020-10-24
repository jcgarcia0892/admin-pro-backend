/* 
    Ruta: /api/medicos
*/

const { Router }        = require('express');
const { check }         = require('express-validator');
const { validarCampos } = require('./../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();


//no se ejecuta la funcion get usuarios solo se manda la referencia
router.get('/', getMedicos );



router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id es obligatorio').isMongoId(),
        validarCampos
    ],
    crearMedico
    );

router.put('/:id',
        [
            validarJWT,
            check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
            check('hospital', 'El id del hospital es obligatorio').isMongoId(),
            validarCampos

        ],            
        actualizarMedico
        );

router.delete('/:id', [validarJWT], borrarMedico );




module.exports = router;