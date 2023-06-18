const { Router } = require('express');
const controladorHabitacion = require('../controladores/controladorHabitacion');
const {body, query} = require('express-validator');
const router = Router();
router.get('/listarservicioshabitacion', controladorHabitacion.ListaServiciosHabitacion);
router.get('/listarhabitacion', controladorHabitacion.ListarHabitacion);
router.get('/listarUnahabitacion', controladorHabitacion.ListarUnaHabitacion);
router.post('/guardar', 
body('idTipo').isInt().withMessage('Debe enviar valores correctos!'),
body('idPiso').isInt().withMessage('Debe enviar valores correctos!'),
controladorHabitacion.guardar);
router.put('/modificar', 
body('idTipo').isInt().withMessage('Debe enviar valores correctos!'),
body('idPiso').isInt().withMessage('Debe enviar valores correctos!'),
body('estado').isString().withMessage('Debe enviar texto!'),
controladorHabitacion.modificar);
router.put('/eliminar', controladorHabitacion.eliminar);
module.exports = router;
