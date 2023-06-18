const { Router } = require('express');
const controladorServicios = require('../controladores/controladorServicio');
const {body, query} = require('express-validator');
const router = Router();
router.get('/listar', controladorServicios.ListaServicio);
router.get('/listarHabitacionServicio', controladorServicios.ListarServiciosHabitacion);
router.get('/listarServicio', controladorServicios.ListarUnServicio);
router.post('/guardar', 
body('servicio').isString().withMessage('Los valores a ingresar son textos!'),
body('descripcion').isString().withMessage('Los valores a ingresar son textos!'),
body('precio').isDecimal().withMessage('Debe de enviar numero!'),
controladorServicios.guardar);
router.put('/modificar', 
body('servicio').isString().withMessage('Los valores a ingresar son textos!'),
body('descripcion').isString().withMessage('Los valores a ingresar son textos!'),
body('precio').isDecimal().withMessage('Debe de enviar numero!'),
controladorServicios.modificar);
router.put('/desactivar', controladorServicios.DesactivarServicio);
router.delete('/eliminar', 
query('id').isInt().withMessage('El id debe de ser entero!'),
controladorServicios.eliminar);
module.exports = router;
