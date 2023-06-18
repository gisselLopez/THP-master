const Sequelize  = require('sequelize');
const db = require('../configuraciones/db');
const UsuarioVista = db.define(
    "clienteVista", //Name tabla
    {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        
        },
        identidad:{
            type: Sequelize.STRING(200),
        
            
        },
        nombres:{
            type: Sequelize.STRING(200),
        },
        apellidos:{
            type: Sequelize.STRING(200),
        },telefono:{
            type: Sequelize.STRING(200),
        },correo:{
            type: Sequelize.STRING(200),
        },direccion:{
            type: Sequelize.STRING(200),
        },idUsuario:{
            type: Sequelize.INTEGER,
        },usuario:{
            type: Sequelize.STRING(200),
        },
        estado:{
            type:Sequelize.ENUM('Activo', 'Inactivo'),
        }
       
    },
    {
        tableName: "clienteVista",
        timestamps: false, //Fecha y hora de creacion del objeto o registro, y modificacion.
       
    }
);
module.exports = UsuarioVista;