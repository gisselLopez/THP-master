const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Reservacion = db.define(
    "reservacion",
    {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idCliente:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        fechaEntrada:{
            type: sequelize.DATE,
            allowNull: false,
        },
        fechaSalida:{
            type: sequelize.DATE,
            allowNull: false,
        },
        impuesto:
        {
            type : sequelize.DOUBLE,
            allowNull : false,
        },
        observacion:
        {
            type : sequelize.STRING(200),
            allowNull : true,
        },
        estado:{
            type: sequelize.ENUM('En espera','Ocupada', 'Pagada'),
            allowNull: false,
        },
        
       
    },

        {
            tableName: "reservacion",
            timestamps:false,
    
        }

); 
module.exports = Reservacion;