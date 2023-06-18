const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces',2);

app.use('/tipohabitacion/img',express.static(path.join(__dirname, 'public/img')));

app.use('/api/clientes',require('./rutas/rutasCliente'));
app.use('/api/tipoHabitacion',require('./rutas/rutasTipoH'));
app.use('/api/archivos',require('./rutas/rutasArchivos'));
app.use('/api/reservacion', require('./rutas/rutasReservacion'));
app.use('/api/factura', require('./rutas/rutasFacturas'));
app.use('/api/tiposusuarios/', require('./rutas/rutasTiposUsuarios'));
app.use('/api/usuarios/', require('./rutas/rutasUsuarios'));
app.use('/api/empleados/', require('./rutas/rutasEmpleados'));
app.use('/api/habitacion', require('./rutas/rutasHabitacion'));
app.use('/api/servicios', require('./rutas/rutasServicios'));
app.use('/api/destalleservicios', require('./rutas/rutasDetalleServicios')); 
app.use('/api/tipopago', require('./Rutas/rutasTipoPago'));
app.use('/api/piso', require('./Rutas/rutasPiso'));
app.use('/api/detallehabitacion', require('./Rutas/rutasDetalleHabitacion'));
app.use('/api/autenticacion/', require('./rutas/rutasAutenticacion'));

app.listen(4002, ()=>{
    console.log("Servidor iniciado en el puerto 4002");
});