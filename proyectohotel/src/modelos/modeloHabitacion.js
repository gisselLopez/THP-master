const Sequelize  = require('sequelize');
const db = require('../configuraciones/db');
const Habitacion = db.define(
    "habitacion", //Name tabla
    {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true,
            allowNull: false
        },
        idTipo:{
            type: Sequelize.INTEGER,
            allowNull: true,
            
        },
        idPiso: 
        {
            type: Sequelize.INTEGER,
            allowNull: true,
          
        },
        estado: 
        {
            type: Sequelize.ENUM("Ocupada", "Disponible", "Fuera de servicio"),
            
        },
        
       
    },
    {
        tableName: "habitacion",
        timestamps: false, //Fecha y hora de creacion del objeto o registro, y modificacion.
       
    }
    

);
module.exports = Habitacion;