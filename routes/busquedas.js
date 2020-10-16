/* 
    ruta: /api/todo
*/
const Router    = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router    = Router();

router.get('/:busquedas', validarJWT, getTodo);

router.get('/coleccion/:tablas/:busquedas', validarJWT, getDocumentosColeccion);

module.exports  = router;