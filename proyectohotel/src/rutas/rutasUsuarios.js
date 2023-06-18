const controladorUsuarios = require('../controladores/controladorUsuarios');
const { Router } = require('express');
const router = Router();
const { body, query} = require('express-validator');


router.get('/listar', controladorUsuarios.ListarUsuarios);
router.post('/guardar',
body('idTipo').isInt().withMessage('Debe enviar valores enteros para el id de la persona'),
body('usuario').isLength({min:3}).withMessage('El nombre de usuario debe tener 3 o más caracteres'),
body('contrasenia').isLength({min:6}).withMessage('La contraseña debe tener 6 o más caracteres'),
controladorUsuarios.guardarUsuario);

router.put('/modificar', 
body('contrasenia').isLength({min:6}).withMessage('La contraseña debe tener 6 o más caracteres'), 
body('usuario').isLength({min:3}).withMessage('El nombre de usuario debe tener 3 o más caracteres'),
controladorUsuarios.modificarUsuario);

router.put('/modificarEstado', controladorUsuarios.modificarEstado);
router.delete('/eliminar', controladorUsuarios.elimarUsuario);

module.exports = router;