const ModeloHabitacionV = require('../modelos/modelovistahabitacion');
const ModeloHabitacion = require('../modelos/modeloHabitacion')
const { validationResult } = require('express-validator');
const ModeloServicioHabitacion = require('../modelos/modeloServiciosHabitacion')
const msj = require('../componentes/mensaje');
exports.ListaServiciosHabitacion = async (req, res) => {
    const {id} = req.query;
    const listaServiciosHabitacion = await ModeloServicioHabitacion.findAll({
        where:{
            idHabitacion: id,
        }
    });

    
    if(listaServiciosHabitacion.length==0){
        msj("Null", 200, [], res);
    }
    else{
        msj(listaServiciosHabitacion, 200, [], res);
    }
};


exports.ListarHabitacion = async (req, res) => {
    const listarhabitacion = await ModeloHabitacionV.findAll();
    if(listarhabitacion.length==0){
        msj("No existen datos", 200, [], res);
    }
    else{
        
        msj(listarhabitacion, 200, [], res);
    }
};

exports.ListarUnaHabitacion = async (req, res) => {
    const { id } = req.query;
    const listarhabitacion = await ModeloHabitacionV.findOne({
        where:
        {
            id: id
        }
    });
    if(listarhabitacion.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listarhabitacion);
    }
};


exports.guardar = async (req, res) => {

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {
        const {idTipo, idPiso, estado} = req.body;
        if(!idTipo || !idPiso ){
            msj("Debe enviar los datos completos", 200, [], res);
        }
        else{
            await ModeloHabitacion.create({
                idTipo: idTipo,
                idPiso: idPiso,
                estado: estado
            })
            .then((data)=>{
                console.log(data);
                msj("Registro almacenado", 200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Hubo un error", 200, [], res);
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
        console.log(req.query);
        console.log(req.body);
        const {id} = req.query;
        const{idTipo, idPiso, estado}= req.body;
        if(!id || !idTipo || !idPiso ||!estado ){
            msj("Debe enviar los datos completos", 200, [], res);
        }
        else{
            var buscarhabitacion = await ModeloHabitacion.findOne({
                where:{
                    id: id,
                }
            });
            if(!buscarhabitacion){
                msj("Este id no existe", 200, [], res);
            }
            else{
                console.log(buscarhabitacion);
                buscarhabitacion.idTipo = idTipo;
                buscarhabitacion.idPiso = idPiso;
                buscarhabitacion.estado = estado;
                await buscarhabitacion.save()
                .then((data)=>{
                    console.log(data);
                    msj("Registro Actualizado", 200, data , res);
                })
                .catch((error)=>{
                    console.log(error);
                    msj("Error al actualizar datos", 200, [], res);
                })
            }
        }

    }
    
};


exports.eliminar= async (req, res) => {

    const { id } = req.query;

        var buscarHabitacionId = await ModeloHabitacion.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarHabitacionId) {
            msj("El ID no existe",200, [], res);
        }
        else {
            

            buscarHabitacionId.estado= "Fuera de servicio"
            await buscarHabitacionId.save()
            .then((data) => {
                console.log(data);
                msj("Registro actualizado",200, data, res);
            }).catch((error) => {
                msj("Error al actualizar los datos",200, error, res);
            });
        }
    

};
