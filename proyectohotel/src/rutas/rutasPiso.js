const controladorPiso = require('../controladores/controladorPiso');

const { Router } = require('express');
const router = Router();


router.get('/listar', controladorPiso.ListarPiso);
router.get('/buscar', controladorPiso.BuscarPiso);
router.post('/guardar', controladorPiso.guardarPiso);
router.put('/modificar', controladorPiso.modificarPiso);
router.put('/desactivar', controladorPiso.DesactivarPiso);
router.delete('/eliminar', controladorPiso.eliminarPiso);

module.exports = router;