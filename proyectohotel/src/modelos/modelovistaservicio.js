const Sequelize  = require('sequelize');
const db = require('../configuraciones/db');
const ServicioV = db.define(
    "vista_servicio", //Name tabla
    {

        idHabitacion:{
            type: Sequelize.INTEGER,
            primaryKey: true,

        },
        servicio:{
            type: Sequelize.STRING(100),
           
        },
       
       
      
    },

    {
        tableName: "vista_servicio",
        timestamps: false,
       
    }
    

);

module.exports = ServicioV;