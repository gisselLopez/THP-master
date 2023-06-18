const { Router } = require('express');
const controladorDetalleServicios = require('../controladores/controladordetalleServicio');
const {body, query} = require('express-validator');
const router = Router();
router.get('/listar', controladorDetalleServicios.ListaDetalleServicio);
router.post('/guardar', 
body('idHabitacion').isInt().withMessage('Debe enviar valores correctos!'),
body('idServicio').isInt().withMessage('Debe enviar valores correctos!'),
controladorDetalleServicios.guardar);
router.post('/modificar', controladorDetalleServicios.modificar);
router.delete('/eliminar', 
query('idHabitacion').isInt().withMessage('Debe enviar valores correctos!'),
query('id').isInt().withMessage('Debe enviar valores correctos!'),
controladorDetalleServicios.eliminar);
router.post('/listarServiciosDisponibles',  controladorDetalleServicios.listarServiciosDisponibles);
module.exports = router;
