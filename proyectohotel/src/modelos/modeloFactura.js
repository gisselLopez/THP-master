const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Factura = db.define(
    "factura",
    {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idReservacion:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        idTipoPago:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        estado:{
            type: sequelize.ENUM('Activo','Inactivo'),
            allowNull: true,
        }
    },

        {
            tableName: "factura",
            timestamps:false,
    
        }

); 
module.exports = Factura;