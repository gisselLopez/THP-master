const controladorTipoPago = require('../controladores/controladorTipoPago');

const { Router } = require('express');
const router = Router();


router.get('/listar', controladorTipoPago.ListarTiposPago);
router.post('/guardar', controladorTipoPago.guardarTipoPago);
router.put('/modificar', controladorTipoPago.modificarTipoPago);
router.delete('/eliminar', controladorTipoPago.eliminarTipoPago);

module.exports = router;