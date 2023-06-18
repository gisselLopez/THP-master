const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Empleado = db.define(
    "empleado",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
           
        },
        idUsuario: 
        {
            type: sequelize.INTEGER,
            
           
        },
        identidad: 
        {
            type: sequelize.STRING,
                   
           
        },
        nombres:{
            type: sequelize.STRING(200),
        },
        apellidos:{
            type: sequelize.STRING(200),
        },
        telefono: 
        {
            type: sequelize.STRING,
            
        },
        
        correo: 
        {
            type: sequelize.STRING,
            
        },
       
        
        fechaNacimiento: 
        {
            type: sequelize.DATE,
          
        },
         estado:{
            type:sequelize.ENUM('Activo', 'Inactivo'),
        },

        usuario: 
        {
            type: sequelize.STRING,
            
        },
       
        

       
    },
    {
        tableName: "empleadosvista",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = Empleado;