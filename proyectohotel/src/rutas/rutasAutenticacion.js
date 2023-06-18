const controladorAutenticacion = require('../controladores/controladorAutenticacion');

const { Router } = require('express');
const router = Router();


router.post('/recuperarContrasena', controladorAutenticacion.recuperarContrasena);
router.post('/iniciosesion', controladorAutenticacion.InicioSesion)

router.get('/error', controladorAutenticacion.Error);
module.exports = router;