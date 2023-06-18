const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const DetalleHabitacion = db.define(
    "habitacionesdisponibles",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
           
        },
        tipoHabitacion: 
        {
            type: sequelize.ENUM('individual','Doble','Cuadruple','Familiar','Suite de lujo'),
           
        },
        fechaEntrada:{
            type: sequelize.DATE,
           
        },
        fechaSalida:{
            type: sequelize.DATE,
            
        },
        descripcion: 
        {
            type:sequelize.STRING(200),
        },
        precio: 
        {
            type: sequelize.DOUBLE,
            primaryKey: true,           
            allowNull: false
        },
        imagen: 
        {
            type:sequelize.STRING(250),
            primaryKey: true,           
            allowNull: false
        },
        numPiso: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,           
            allowNull: false
        },
    },
    {
        tableName: "habitacionesdisponibles",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = DetalleHabitacion;