const controladorEmpleado = require('../controladores/controladorEmpleado');

const { Router } = require('express');
const router = Router();
const { body, query} = require('express-validator');

router.get('/listar', controladorEmpleado.listarEmpleados);

router.get('/buscar',controladorEmpleado.BuscarEmpleado);

router.get('/buscarUsuario',controladorEmpleado.BuscarEmpleadoPorUsuario);

router.put('/desactivar', controladorEmpleado.DesactivarEmpleado);

router.post('/guardar', 
body('identidad').isLength({max:13}).withMessage('La identidad debe conetner 13 digitos'), 
body('identidad').isLength({min:13}).withMessage('La identidad debe conetner 13 digitos'), 
body('telefono').isLength({min:8}).withMessage('El telefono debe conetner 8 digitos'), 
body('telefono').isLength({max:8}).withMessage('El telefono debe conetner 8 digitos'), 
body('correo').isEmail().withMessage('Debe ingresar un correo valido'),
 controladorEmpleado.guardarEmpleado);

 router.put('/modificar', 
body('identidad').isLength({max:13}).withMessage('La identidad debe conetner 13 digitos'), 
body('identidad').isLength({min:13}).withMessage('La identidad debe conetner 13 digitos'), 
body('telefono').isLength({min:8}).withMessage('El telefono debe conetner 8 digitos'), 
body('telefono').isLength({max:8}).withMessage('El telefono debe conetner 8 digitos'), 
body('correo').isEmail().withMessage('Debe ingresar un correo valido'),
 controladorEmpleado.modificarEmpleado);

 router.delete('/eliminar', controladorEmpleado.elimarEmpleado);

module.exports = router;