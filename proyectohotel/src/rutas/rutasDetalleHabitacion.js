const controladorDetalleHabitacion = require('../controladores/controladorDetalleHabitacion');

const { Router } = require('express');
const router = Router();


router.get('/listar', controladorDetalleHabitacion.listardetalles);
router.post('/guardar', controladorDetalleHabitacion.guardarDetalleHabitacion);
router.put('/modificar', controladorDetalleHabitacion.modificarDetalleHabitacion);
router.delete('/eliminar', controladorDetalleHabitacion.eliminarDetalleHabitacion);

module.exports = router;