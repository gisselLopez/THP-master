const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const TipoPago = db.define(
    "tipo",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipoPago: 
        {
            type: sequelize.ENUM('Efectivo', 'Tarjeta'),  
            allowNull: true
        },
        estado:
        {
            type: sequelize.ENUM('Activo', 'Inactivo'), 
            allowNull: true 

        }
    },
    {
        tableName: "tipopago",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = TipoPago;