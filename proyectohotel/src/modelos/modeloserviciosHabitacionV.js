const Sequelize  = require('sequelize');
const db = require('../configuraciones/db');
const ServicioV = db.define(
    "vistaSevicioHabitaciones", //Name tabla
    {
        idHabitacion:{
            type: Sequelize.INTEGER,
            primaryKey: true

        },
        id:{
            type: Sequelize.INTEGER

        },
        servicio:{
            type: Sequelize.STRING(100)
           
        },
        descripcion:{
            type: Sequelize.STRING(255)

        },
        precio:{
            type: Sequelize.DOUBLE
           
        },
       
       
      
    },

    {
        tableName: "vistaSevicioHabitaciones",
        timestamps: false,
       
    }
    

);

module.exports = ServicioV;