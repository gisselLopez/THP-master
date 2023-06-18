const ModeloReservacionVista = require('../modelos/modeloReservacionVista');
const ModeloReservacion = require('../modelos/modeloReservacion');
const ModeloReservacioValidacion = require("../modelos/modeloReservacionVistaValidacion");
const ModeloHabitacionReservacion = require("../modelos/modeloHabitacionesRservacion");
const ModelosDetalleH = require('../modelos/modeloDetalleHabitacion');
const ModelosUltimaReservacion = require('../modelos/modelUltimaReservacion');
const {Op}  = require('sequelize');

//const {hola} = require('@sequelize/core');

const { validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');

exports.HabitacionesXReservacion = async (req, res) => {
    const { id } = req.query;
    const listarReservacion = await ModeloHabitacionReservacion.findAll({
        where: {
            id: id
        }
    });
    if (listarReservacion.length == 0) {
        res.json(listarReservacion);
    }
    else {

      res.json(listarReservacion);
    }
};

exports.ListarHabitacionesDisponibles = async (req, res) => {
    const {fechaEntrada, fechaSalida} = req.body;

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

    const sqlQuery = "call hotel.getHabitacionesDisponibles('" + fechaEntrada + "'" + ",'" + fechaSalida +"');"
    console.log(sqlQuery);
    sequelize.query(sqlQuery).then(results => {
        console.log(results);
        res.json(results);
        sequelize.close();
    });
    

   

    /*sequelize.query('call hotel.getHabitacionesDisponibles(:fechaIn, :fechaOut);'),
        {replacements: { fechaIn: fechaEntrada, fechaOut: fechaSalida }}
  .then(v=>console.log(v));*/

    
};

exports.ListarReservacion = async (req, res) => {
    const listarReservacion = await ModeloReservacionVista.findAll({});
    if (listarReservacion.length == 0) {
        msj("No existen datos",200, [], res);
    }
    else {

        res.json(listarReservacion);
    }
};
exports.ListarReservacionesPorCliente = async (req, res) => {
    const { idCliente } = req.query;
    const listarReservacion = await ModeloReservacionVista.findAll({
        where: {
            idCliente: idCliente
        }
    });
    if (listarReservacion.length == 0) {
     
       msj("Null", 200, [], res);
    }
    else {

        msj(listarReservacion,200, [], res);
    }
};

exports.BuscarReservacion = async (req, res) => {
    const { id } = req.query;
    const listarReservacion = await ModeloReservacionVista.findAll({
        where: {
            id: id
        }
    });
    if (listarReservacion.length == 0) {
        msj("Null",200, [], res);
    }
    else {

        res.json(listarReservacion);
    }
};


exports.GuardarReservacion = async (req, res) => {
    const validacion = validationResult(req);
    console.log(validacion);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { idCliente, fechaEntrada, fechaSalida, impuesto, observacion, estado, } = req.body;
        const idHabitacionV = 8;
        if (!idCliente || !fechaEntrada || !fechaSalida || !estado) {

            msj("Debe enviar los datos completos");
        }
        else {
        
                if(fechaSalida > fechaEntrada)
                {
                    if(impuesto>=0)
                    {
                        await ModeloReservacion.create(
                            {
                                idCliente: idCliente,
                                fechaEntrada: fechaEntrada,
                                fechaSalida:fechaSalida,
                                impuesto:impuesto,
                                observacion:observacion,
                                estado:estado
    
                            })
                            .then((data) => {
                                console.log(data);
                                msj("Reservacion guardada", 200, data, res);
                            })
                            .catch((error) => {
                                console.log(error);
                                msj("Error al guardar los datos",200, error, res);
                            });
                    } 
                    else
                    {
                        msj("El impuesto debe ser mayor o igual a 0", 200, [], res);
                    } 
                }
                else
                {
                    msj("La fecha de salida debe ser mayor a la fecha de entrada", 200, [], res);
                }
            

        }
    }
}


exports.ActualizarReservacion = async (req, res) => {

    const { id } = req.query;
    const { idCliente, fechaEntrada, fechaSalida,  impuesto, observacion, estado } = req.body;
    const idHabitacionV = 5;
    if (!idCliente || !fechaEntrada || !fechaSalida || !estado) {

            msj("Envie los datos completos", 200, [], res);
        }
    else {
        var buscarReservacionId = await ModeloReservacion.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarReservacionId) {
            msj("El id no existe", 200, [], res);
        }
        else {
                if(fechaSalida > fechaEntrada)
                {
                    if(impuesto >= 0)
                    {
                        buscarReservacionId.idCliente= idCliente,
                        buscarReservacionId.fechaEntrada= fechaEntrada,
                        buscarReservacionId.fechaSalida=fechaSalida,
                        buscarReservacionId.impuesto=impuesto,
                        buscarReservacionId.observacion=observacion,
                        buscarReservacionId.estado = estado

                        await buscarReservacionId.save()
                        .then((data) => {
                            console.log(data);
                            msj("Reservacion guardada", 200, data, res);
                        }).catch((error) => {
                            msj("Error al actualizar los datos",200, error, res);
                        });
                    }
                    else
                    {
                        msj("El impuesto debe ser mayor o igual a 0", 200, [], res);
                    } 
                    
                }
                else
                {
                    msj("La fecha de salida debe ser mayor a la fecha de entrada", 200, [], res);
                }

            
           
        }
    }

}

exports.CancelarReservacion = async (req, res) => {

    const { id } = req.query;

        var buscarReservacionId = await ModeloReservacion.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarReservacionId) {
            msj("El id no existe", 200, [], res);
        }
        else {
                buscarReservacionId.estado = "Cancelado"

                await buscarReservacionId.save()
                .then((data) => {
                    console.log(data);
                    msj("Reservacion cancelada", 200, data, res);
                }).catch((error) => {
                    msj("Error al actualizar los datos",200, error, res);
                });  
        }
    

}


exports.EliminarReservacion = async (req, res) => {

    const { id } = req.query;


    if (!id) {
        msj("Envie el id del registro", 200, [], res);
    }
    else {
        var buscarReservacion = await ModeloReservacion.findOne({
            where:
            {   
                id: id,
            }
        }
        );
        if (!buscarReservacion) {
            
            msj("El id no existe", 200, [], res);
            
        }

        else {
            await buscarReservacion.destroy({
                where:
                {
                    id: id,
                }

            })
                .then((data) => {
                    console.log(data); 
                    if (data == 0) {
                        msj("El id no existe", 200, [], res);
                    }
                    else {
                        msj("Reservacion cancelada", 200, data, res);
                    }

                }).catch((error) => {
                    msj("Error al eliminar los datos",200, error, res);
                });

        }
    }

}

exports.EliminarReservacionSinHabitacion = async (req, res) => {

    
    const idReservacion =  await ModelosUltimaReservacion.findOne();
    console.log(idReservacion.id);

    var buscarReservacion = await ModelosDetalleH.findAll({
        where:
        {   
            idReservacion: idReservacion.id,
        }
    }
    );
    if (buscarReservacion.length == 0) {

            var buscarReservacionF = await ModeloReservacion.findOne({
                where:
                {   
                    id: idReservacion.id,
                }
            }
            );

            await buscarReservacionF.destroy({
                where:
                {
                    id: idReservacion.id,
                }

            })
                .then((data) => {
                    console.log(data); 
                    if (data == 0) {
                        msj("El Id no existe", 200, [], res);
                        
                    }
                    else {
                        msj("Reservacion eliminada", 200, data, res);
                       
                    }

                }).catch((error) => {
                    msj("Error al eliminar los datos", 200, error, res);
                    
                });
    }

   
    

}

