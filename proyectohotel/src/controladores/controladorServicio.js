const ModeloServicio = require('../modelos/modeloServicio')
const ModeloServicioVista = require('../modelos/modeloserviciosHabitacionV')
const { validationResult } = require('express-validator');
const {Op}  = require('sequelize');
const msj = require('../componentes/mensaje');

exports.ListaServicio = async (req, res) => {
    const listarServicio = await ModeloServicio.findAll();
    if(listarServicio.length==0){
        msj("No existen servicios", 200, [], res);
    }
    else{
        msj(listarServicio, 200, [], res);;
    }
};


exports.guardar = async (req, res) => {

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {
        const {servicio, descripcion, precio} = req.body;
        if(!servicio ){
            msj("Debe enviar los datos completos", 200, [], res)
        }
        else{
            const buscarServicio = await ModeloServicio.findOne({
                where:{
                    servicio:servicio
                }  
            }); 
               if(buscarServicio){
                  msj('Servicio existente!', 200, [], res);
               }
               else{
                    await ModeloServicio.create({
                        servicio: servicio,
                        descripcion:descripcion,
                        precio: precio,
                        
                    })
                    .then((data)=>{
                        console.log(data);
                        msj("Registro almacenado", 200, data, res);
                    })
                    .catch((error)=>{
                        console.log(error);
                        msj("Error al guardar los datos", 200, error, res);
                    });
               }
            
            
        }

    }
};


exports.modificar= async (req, res) => {

    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const { id } = req.query;
        const{ servicio, descripcion, precio, estado} = req.body;
        if(  !servicio || !descripcion || !precio || !estado){
            msj("Debe enviar los datos completos", 200, [], res)
        }else{
            var buscarServicio = await ModeloServicio.findOne({
                where:{
                    id:id,
                }
            });
            if(!buscarServicio){
               msj("El id del no existe", 200, [], res);
            }else{
                var buscarServicioS = await ModeloServicio.findOne({
                where:{
                    servicio:servicio
                }
            });
            if(!buscarServicioS || buscarServicioS.servicio == buscarServicio.servicio){
                
                buscarServicio.servicio=servicio;
                buscarServicio.descripcion=descripcion;
                buscarServicio.precio=precio;
                buscarServicio.estado=estado;

                await buscarServicio.save()
                    .then((data)=>{
                        console.log(data);
                       msj("Registro actualizado", 200, data, res)
                    })
                    .catch((error)=>{
                        console.log(error);
                       msj("Error al modificar los datos", 200, error, res)
                });
            }else{
               msj("identidad en uso")
            }
                
                
            }
                
        }
    }    
    
};


exports.DesactivarServicio = async (req, res) => {

    const { id } = req.query;

        var buscarServicioId = await ModeloServicio.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarServicioId) {
            msj("El ID no existe",200, [], res);
        }
        else {
            

            buscarServicioId.estado= "Inactivo"

            await buscarServicioId.save()
            .then((data) => {
                console.log(data);
                msj("Registro actualizado",200, data, res);
            }).catch((error) => {
                msj("Error al actualizar los datos",200, error, res);
            });
        }
    
}


exports.eliminar= async (req, res) => {

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {
        const {id} = req.query;
        if(!id){
            res.send("Envie el id del registro")
        }
        else{
            var buscarservicio = await ModeloServicio.findOne({
                where:{
                    id: id,
                }
            });
            if(!buscarservicio){
                res.send("El id no existe!")
            }
            else{
                await ModeloServicio.destroy({
                    where:
                    {
                        id: id,
                    }
                    
                })
                .then((data)=>{
                    console.log(data);
                    res.send("Registro eliminado!");
                })
                .catch((error)=>{
                    console.log(error);
                    res.send("Error al eliminar los datos!");
                })
            }
        }

    }

};

exports.ListarUnServicio = async (req, res) => {
    const { id } = req.query;
    const listarServicio = await ModeloServicio.findOne({
        where:
        {
            id: id
        }
    });
    if(listarServicio.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listarServicio);
    }
};


exports.ListarServiciosHabitacion = async (req, res) => {
    const { id } = req.query;
    const listarServicio = await ModeloServicioVista.findAll({
        where:
        {
            idHabitacion: id
        }
    });
    if(listarServicio.length==0){
        msj("No existen servicios", 200, [], res);
    }
    else{
        msj(listarServicio, 200, [], res);;
    } 
}