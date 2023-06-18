const Sequelize  = require('sequelize');
const db = require('../configuraciones/db');
const HabitacionV = db.define(
    "vista_habitacion", //Name tabla
    {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,

        },
        tipoHabitacion:{
            type: Sequelize.STRING(100),
           
        },
        descripcion: 
        {
            type: Sequelize.STRING(200),
           
        },
        precio: 
        {
            type: Sequelize.DOUBLE,
            
        },
        imagen: 
        {
            type: Sequelize.STRING(250),
            
        }, 
        numPiso: 
        {
            type: Sequelize.INTEGER,
            
        },
        estado:
        {
            type: Sequelize.STRING(200),
        }, 
        idTipo:
        {
            type: Sequelize.INTEGER,
        }, 
        idPiso:
        {
            type: Sequelize.INTEGER,
        }
       
      
    },

    {
        tableName: "vista_habitacion",
        timestamps: false,
       
    }
    

);

module.exports = HabitacionV;