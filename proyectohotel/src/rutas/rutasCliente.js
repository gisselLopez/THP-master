const {Router }= require('express');
const controladorCliente= require('../controladores/controladorCliente')
const ModeloCliente= require('../modelos/modeloCliente')

const { body, query } = require('express-validator');
const { userInfo } = require('os');
const { rest } = require('lodash');
const router = Router();
//--------------------------------------------------//
router.get('/listar',controladorCliente.ListarCliente);

router.get('/buscar',controladorCliente.BuscarCliente);

router.get('/buscarUsuario',controladorCliente.BuscarClientePorUsuario);

router.put('/desactivar', controladorCliente.DesactivarCliente);
//--------------------------------------------------//
router.post('/guardar', 
body('identidad')
.isLength({min:13, max:13}).withMessage('la identidad debe tener 13 digitos')
.isInt('Deben ser valores enteros'),

body('telefono').isLength({min:8, max:8}).withMessage('El telefono debe contener 8 digitos')
.isNumeric('Deben ser numeros para el telefono'),
 

body('correo').isEmail().withMessage('Debe enviar un correo valido'),
controladorCliente.guardar); 

//--------------------------------------------------//
router.put('/modificar',
body('identidad')
.isLength({min:13, max:13}).withMessage('la identidad debe tener 13 digitos')
.isInt('Deben ser valores enteros'),

body('telefono').isLength({min:8, max:8}).withMessage('El telefono debe contener 8 digitos')
.isNumeric('Deben ser numeros para el telefono'),


body('correo').isEmail().withMessage('Debe enviar un correo valido'),
controladorCliente.modificar);
//--------------------------------------------------//
router.delete('/eliminar',controladorCliente.eliminar);

module.exports=router;