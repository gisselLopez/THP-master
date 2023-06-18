const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const TipoHabitacion = db.define(
    "tiposHabitacion",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tipoHabitacion:{
           type: sequelize.ENUM('individual','Doble','Cuadruple','Familiar','Suite de lujo'),
            allowNull: false,
        },
        descripcion:{
            type:sequelize.STRING(200),
             allowNull: false,
        },
        imagen:{
            type:sequelize.STRING(250),
             allowNull: false,
        },
        precio:{
            type:sequelize.BOOLEAN,
             allowNull: false,
        },
    },
    {
        tableName: "tipoHabitacion", 
        timestamps: false,
    }
);
module.exports=TipoHabitacion;