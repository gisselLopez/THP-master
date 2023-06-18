const Sequelize  = require('sequelize');
const db = require('../configuraciones/db');
const Servicio = db.define(
    "servicio", //Name tabla
    {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true,
            allowNull: false
        },
        servicio:{
            type: Sequelize.STRING(120),
            allowNull: true,
            
        },
        descripcion: 
        {
            type: Sequelize.STRING(255),
            allowNull: true,
          
        },
        precio: 
        {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        estado:
        {
            type: Sequelize.ENUM('Activo', 'Inactivo'),
          
        }
        
       
    },
    {
        tableName: "servicio",
        timestamps: false, //Fecha y hora de creacion del objeto o registro, y modificacion.
       
    }
    

);
module.exports = Servicio;