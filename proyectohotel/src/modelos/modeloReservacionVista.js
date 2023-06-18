const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Reservacion = db.define(
    "reservacion",
    {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
          
        },
        idCliente:{
            type: sequelize.INTEGER,
            
          
        },
        identidad: {
            type: sequelize.STRING(13),
        },
        nombreCliente:{
            type: sequelize.INTEGER,
           
        },
        telefono: {
            type: sequelize.STRING(8),
        },
        fechaEntrada:{
            type: sequelize.DATE,
           
        },
        fechaSalida:{
            type: sequelize.DATE,
            
        },
        subtotal:
        {
            type : sequelize.DOUBLE,
          
        },
        impuesto:
        {
            type : sequelize.DOUBLE,
          
        },
        observacion:
        {
            type : sequelize.STRING(200),
            
        },
        estado:{
            type: sequelize.ENUM('En espera','Ocupada', 'Pagada'),
           
        },
        
       
    },

        {
            tableName: "reservacionVista",
            timestamps:false,
    
        }

); 
module.exports = Reservacion;