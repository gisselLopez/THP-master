const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Usuario = db.define(
    "usuariov",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
           
        },
       
        usuario: 
        {
            type: sequelize.STRING(45),
         
        },
       
        
        contrasenia: 
        {
            type: sequelize.STRING(255),
            
        },
        
        tipoUsuario: 
        {
            type: sequelize.ENUM('Cliente', 'Empleado'),  
            
        },
        estado: 
        {
            type: sequelize.ENUM('Habilitado', 'Inhabilitado'),  
           
        }
      

       
    },
    {
        tableName: "usuariosvista",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
    }
);
module.exports = Usuario;