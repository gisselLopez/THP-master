const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const IdUsuario = db.define(
    "idUsuario",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
         
        }     
    },
    {
        tableName: "obteneridusuario",
        timestamps: false, 
    }
);
module.exports = IdUsuario;