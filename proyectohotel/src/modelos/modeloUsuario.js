const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');
const Usuario = db.define(
    "usuario",
    {
        id: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        usuario: 
        {
            type: sequelize.STRING(45),
            allowNull: false
        },       
        
        contrasenia: 
        {
            type: sequelize.STRING(255),
            allowNull: false
        },

        idTipo: 
        {
            type: sequelize.INTEGER,
            foreignKey: true,           
            allowNull: false
        },
        estado: 
        {
            type: sequelize.ENUM('Habilitado', 'Inhabilitado'),  
            allowNull: true,
            defaultValue: 'Habilitado'
        },
        
        

       
    },
    {
        tableName: "usuario",
        timestamps: false, //la fecha y hora de creacion y modificación del registro
        hooks:
        {
            beforeCreate(usuario)
            {
                const hast = bcrypt.hashSync(usuario.contrasenia, 10);
                usuario.contrasenia = hast;
            },
            beforeUpdate(usuario)
            {
                const hast = bcrypt.hashSync(usuario.contrasenia, 10);
                usuario.contrasenia = hast;
            }
        },
    }
);
Usuario.prototype.VerificarContrasenia = (con, com)  => { //password, jsonwebtokken, nodemailer
    return bcrypt.compareSync(con, com)
};
module.exports = Usuario;