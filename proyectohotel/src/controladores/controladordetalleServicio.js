const ModeloDetalleServicioV = require('../modelos/modelovistaservicio');
const ModeloDetalleServicio = require('../modelos/modelodetalleservicio')
const { validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');
exports.ListaDetalleServicio = async (req, res) => {
    const listardetalleServicio = await ModeloDetalleServicioV.findAll();
    if(listardetalleServicio.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listardetalleServicio);
    }
};


exports.guardar = async (req, res) => {

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {
        const {idHabitacion, idServicio} = req.body;
        if(!idHabitacion || !idServicio ){
            msj("Debe enviar los datos completos!", 200, [], res)
        }
        else{
            await ModeloDetalleServicio.create({
                idHabitacion: idHabitacion,
                idServicio: idServicio,
           
            })
            .then((data)=>{
                console.log(data);
                msj("Registros Almacenados!", 200, [], res)
            })
            .catch((error)=>{
                console.log(error);
                msj("Hubo un error", 200, [], res)
            });
        }

    }
};


exports.modificar= async (req, res) => {

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {

        const {idHabitacion, idServicio} = req.query;
        const {idh, ids} = req.body;
        if(!idHabitacion){
            res.send("Envie el id del registro")
        }
        else{
            var buscarDetalleServicio = await ModeloDetalleServicio.findOne({
                where:{
                    idHabitacion: idHabitacion,
                    idServicio: idServicio
                }
            });
            if(!buscarDetalleServicio){
                res.send("El id no existe!")
            }
            else{
                await ModeloDetalleServicio.destroy({
                    where:
                    {
                        idHabitacion: idHabitacion,
                        idServicio: idServicio
                    }
                    
                })
                await ModeloDetalleServicio.create({
                    idHabitacion: idh,
                    idServicio: ids,
               
                })
                .then((data)=>{
                    console.log(data);
                    res.send("Registro modificado!");
                })
                .catch((error)=>{
                    console.log(error);
                    res.send("Error al modificar los datos!");
                })

              
             
            }
        }
    

    }
    
};


exports.eliminar= async (req, res) => {

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {
        const {idHabitacion, id} = req.query;
        const idServicio = id;
        if(!idHabitacion){
            res.send("Envie el id del registro")
        }
        else{
            var buscarDetalleServicio = await ModeloDetalleServicio.findOne({
                where:{
                    idHabitacion: idHabitacion,
                    idServicio: idServicio
                }
            });
            if(!buscarDetalleServicio){
                msj("El id no existe!", 200, [], res);
            }
            else{
                await ModeloDetalleServicio.destroy({
                    where:
                    {
                        idHabitacion: idHabitacion,
                        idServicio: idServicio
                    }
                    
                })
                .then((data)=>{
                    console.log(data);
                    msj("Registro eliminado!", 200, [], res);
                })
                .catch((error)=>{
                    console.log(error);
                    msj("Error al eliminar los datos", 200, [], res);
                })
            }
        }

    }

};


exports.listarServiciosDisponibles = async (req, res) => {
    const {id} = req.body;

    const Sequelize = require('sequelize');
    const pass = process.env.pass;
    const sequelize = new Sequelize('hotel', 'root', pass, {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    operatorsAliases: false
    });

    const sqlQuery = "call hotel.serviciosDisponibles('" + id + "');"
    console.log(sqlQuery);
    sequelize.query(sqlQuery).then(results => {
        console.log(results);
        res.json(results);
        sequelize.close();
    });
}