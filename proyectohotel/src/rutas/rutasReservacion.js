const { Router } = require('express');
const controladorReservacion = require('../controladores/controladorReservacion');
const {body,query} = require('express-validator');
const router = Router();

router.post('/listarHabitacionesDisponibles',controladorReservacion.ListarHabitacionesDisponibles);

router.get('/listarHabitacionesXR',controladorReservacion.HabitacionesXReservacion);

router.get('/listar',controladorReservacion.ListarReservacion);
router.get('/listarPorCliente',controladorReservacion.ListarReservacionesPorCliente);

router.get('/buscar',controladorReservacion.BuscarReservacion);
router.post('/guardar', 
body('impuesto').isFloat().withMessage('Solo permite numeros'),

controladorReservacion.GuardarReservacion);
router.put('/modificar', 
body('impuesto').isFloat().withMessage('Solo permite numeros'),

controladorReservacion.ActualizarReservacion);
router.delete('/eliminar', controladorReservacion.EliminarReservacion);

router.put('/cancelar', controladorReservacion.CancelarReservacion);

router.delete('/eliminarReservacionSinHabitacion',controladorReservacion.EliminarReservacionSinHabitacion);

module.exports=router;