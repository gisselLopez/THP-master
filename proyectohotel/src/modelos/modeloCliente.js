const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Cliente = db.define(
    "clientes",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        identidad:{
            type: sequelize.STRING(13),
             allowNull: false,
             unique: {
                msj: 'La identidad debe ser unica'
            },
        },
        nombres:{
            type: sequelize.STRING(100),
             allowNull: false,
        },
        apellidos:{
            type: sequelize.STRING(100),
             allowNull: false,
        },
        telefono:{
            type: sequelize.STRING(15),
             allowNull: true,
        },
        correo:{
            type: sequelize.STRING(45),
            allowNull: true,
       
        },
         direccion:{
            type: sequelize.STRING(255),
            allowNull: true,
             defaultValue:'No hay'
       
        },
         estado:{
            type:sequelize.ENUM('Activo', 'Inactivo'),
        },
         idUsuario:{
            type: sequelize.INTEGER,
            allowNull: false,
       
         }
        
    },
    {
        

        tableName: "cliente",
        timestamps: false,
    }
);
module.exports=Cliente;