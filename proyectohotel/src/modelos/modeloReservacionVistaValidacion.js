const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Reservacion = db.define(
    "vistadetallereservacion",
    {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true
          
        },
        fechaEntrada:{
            type: sequelize.DATE
           
        },
        fechaSalida:{
            type: sequelize.DATE
        },
        idHabitacion:{
            type: sequelize.INTEGER
            
        }
      
    },

        {
            tableName: "vistadetallereservacion",
            timestamps:false,
    
        }

); 
module.exports = Reservacion;