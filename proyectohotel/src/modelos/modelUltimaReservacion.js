const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Reservacion = db.define(
    "ultimareservacion",
    {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true
          
        }
        
       
    },

        {
            tableName: "ultimareservacion",
            timestamps:false,
    
        }

); 
module.exports = Reservacion;