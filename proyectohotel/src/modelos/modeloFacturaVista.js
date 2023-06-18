const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Factura = db.define(
    "factura",
    {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
           
        },
        identidad:{
            type: sequelize.STRING(13),
            
        },
        idReservacion:{
            type: sequelize.INTEGER
           
        },
        nombreCliente:{
            type: sequelize.STRING(130),
            
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
        idTipoPago:{
            type: sequelize.INTEGER
           
        },
        tipoPago:
        {
            type : sequelize.STRING(50),
        },
        observacion:
        {
            type : sequelize.STRING(200),
            
        },
        estado:{
            type: sequelize.ENUM('Activo','Inactivo'),
           
        }
        
    },

        {
            tableName: "facturaVista",
            timestamps:false,
    
        }

); 
module.exports = Factura;