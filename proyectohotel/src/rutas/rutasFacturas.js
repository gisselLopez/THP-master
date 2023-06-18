const { Router } = require('express');
const controladorFactura = require('../controladores/controladorFactura');

const router = Router();


router.get('/listar',controladorFactura.ListarFactura);
router.get('/buscar',controladorFactura.BuscarFacturaId);
router.post('/guardar',controladorFactura.GuardarFactura);
router.put('/modificar', controladorFactura.ActualizarFactura);
router.put('/desactivar', controladorFactura.DesactivarFactura);
router.delete('/eliminar',controladorFactura.EliminarFactura);

module.exports=router;