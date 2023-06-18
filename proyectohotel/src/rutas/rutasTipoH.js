const {Router }= require('express');
const { body, query } = require('express-validator')
const controladorTipos= require('../controladores/controladorTipoHabitacion')

//instanciamos
const router = Router();
//--------------------------------------------------//
router.get('/listar',controladorTipos.ListarTipos);
router.get('/busvarTipo',controladorTipos.BuscarTipoHabitacion);
//--------------------------------------------------//
router.post('/guardar',
body('tipoHabitacion')
.isIn(['Individual','Doble','Cuadruple','Suite de lujo','Familiar']).withMessage('Tipo de habitacion invalida debe ser: familiar, doble, suite de lujo, individual, cuadruple')
,
//--------------------------------------------------//
body('precio').isInt().withMessage('Debe enviar los valores enteros para el precio'),
controladorTipos.guardar);
//--------------------------------------------------//
router.put('/modificar',
body('tipoHabitacion')
.isIn(['Individual','Doble','Cuadruple','Suite de lujo','Familiar']).withMessage('Tipo de habitacion invalida debe ser: familiar, doble, suite de lujo, individual, cuadruple'),
//-----------------------------------------------------//
body('precio').isInt().withMessage('Debe enviar los valores enteros para el precio'),
controladorTipos.modificar);

//--------------------------------------------------//
router.delete('/eliminar',controladorTipos.eliminar);

module.exports=router;








/*
body('tipoHabitacion')
.custom( async (tipoHabitacion)=>{
    const buscarTH = await ModeloTipoHabitacion.findByid(tipoHabitacion);
    if(buscarTH){
        throw new Error('ya existe')
    }
}),
*/