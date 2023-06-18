const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Piso = db.define(
    "piso",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        numPiso: 
        {
            type: sequelize.INTEGER,          
            allowNull: false
        },
        capacidad: 
        {
            type: sequelize.INTEGER,          
            allowNull: false
        },
        estado:
        {
            type: sequelize.ENUM('Activo', 'Inactivo'), 
            allowNull: true 

        }
    },
    {
        tableName: "piso",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = Piso;