const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Empleado = db.define(
    "persona",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        identidad: 
        {
            type: sequelize.STRING(13),
            allowNull: false
        },
        nombres: 
        {
            type: sequelize.STRING(45),
            allowNull: false
        },
        apellidos: 
        {
            type: sequelize.STRING(45),
            allowNull: false
        },
        telefono: 
        {
            type: sequelize.STRING(10),
            allowNull: false
        },
        correo: 
        {
            type: sequelize.STRING(45),
            allowNull: false
        },
        fechaNacimiento: 
        {
            type: sequelize.DATE,
            allowNull: false
        },
         estado:{
            type:sequelize.ENUM('Activo', 'Inactivo'),
        },

        idUsuario: 
        {
            type: sequelize.INTEGER,
            foreignKey: true,           
            allowNull: false
        },
        
        

    },
    {
        tableName: "empleado",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = Empleado;