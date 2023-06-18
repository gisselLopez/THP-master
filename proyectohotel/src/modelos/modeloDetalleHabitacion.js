const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const DetalleHabitacion = db.define(
    "detallehabitaciones",
    {
        idReservacion: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        idHabitacion: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,           
            allowNull: false
        },
    },
    {
        tableName: "detallehabitaciones",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = DetalleHabitacion;