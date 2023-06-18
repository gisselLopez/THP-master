const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const TipoUsuario = db.define(
    "TipoUsuario",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipoUsuario: 
        {
            type: sequelize.ENUM('Cliente', 'Empleado'),  
            allowNull: true,
        }
        
    },
    {
        tableName: "tipousuario",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = TipoUsuario;