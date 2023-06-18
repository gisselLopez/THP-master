const Sequelize  = require('sequelize');
const db = require('../configuraciones/db');
const DetalleServicio = db.define(
    "detalleServicio", //Name tabla
    {

        idHabitacion:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : false,
            allowNull: false
        },
        idServicio:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : false,
            allowNull: false
            
        },
        
       
    },
    {
        tableName: "detalleServicio",
        timestamps: false, //Fecha y hora de creacion del objeto o registro, y modificacion.
       
    }
    

);
module.exports = DetalleServicio;