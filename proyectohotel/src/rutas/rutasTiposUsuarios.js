const controladorTipoUsuario = require('../controladores/controladorTipoUsuario');

const { Router } = require('express');
const router = Router();


router.get('/listar', controladorTipoUsuario.listarTiposUsuarios);
router.post('/guardar', controladorTipoUsuario.guardarTipoUsuario);
router.put('/modificar', controladorTipoUsuario.modificarTipoUsuario);
router.delete('/eliminar', controladorTipoUsuario.eliminarTipoUsuario);

module.exports = router;