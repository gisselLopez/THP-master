const ModeloTipoHabitacion = require('../modelos/modeloTipoHabitacion');
const { validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');
exports.ListarTipos = async(req, res)=>{
    const listaTipos = await ModeloTipoHabitacion.findAll();
    if(listaTipos.length==0){
    res.send("No existen datos");
    }else{
        res.json(listaTipos);

    }
};

//Guardar
exports.guardar = async(req, res)=>{
    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }

    else
    {
        const{ tipoHabitacion, precio,descripcion,imagen } = req.body;

        if(!tipoHabitacion|| !precio || !descripcion || !imagen){
            msj("Debe enviar los datos completos", 200, [], res)
        }
         if(precio < 0){
            msj("debe enviar un numero mayor a 0", 200, [], res)
        }  
        
        else{
            const buscarTipo = await ModeloTipoHabitacion.findOne({
            where:{
                tipoHabitacion:tipoHabitacion
            }  
        }); 
        
            if(buscarTipo)
            {
            msj('Ya existe el tipo de habitación', 200, [], res)
            }
            else{
                await ModeloTipoHabitacion.create({
                    tipoHabitacion: tipoHabitacion,
                    descripcion:descripcion,
                    precio:precio,
                    imagen:imagen
                
                })
                .then((data)=>{
                    console.log(data);
                    msj("Registro almacenado", 200, data, res)
                })
                .catch((error)=>{
                    console.log(error);
                    msj("Error al guardar los datos", 200, error, res)
                });

            }
            
        }
    }   
};
//Modificar
exports.modificar = async(req, res)=>{
  const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const { id } = req.query;
        const{ tipoHabitacion,precio,descripcion} = req.body;
        if( !id || !tipoHabitacion|| !precio ){
            msj("Debe enviar los datos completos", 200, [], res);
        }
        if(precio < 0){
            msj("debe enviar un numero mayor a 0", 200, [], res);
        }  
        else{
        var buscarTipo = await ModeloTipoHabitacion.findOne({
            where:{
                id:id,
            }
        });
        if(!buscarTipo){
            msj("el id no existe", 200, [], res);
        }else{
            var buscarTipoID = await ModeloTipoHabitacion.findOne({
                where:{
                    tipoHabitacion:tipoHabitacion,
                }
            });
             if(!buscarTipoID || buscarTipoID.tipoHabitacion == buscarTipo.tipoHabitacion){
                
                buscarTipo.tipoHabitacion=tipoHabitacion;
                buscarTipo.descripcion=descripcion;
                buscarTipo.precio=precio;
                await buscarTipo.save()
                    
                    .then((data)=>{
                        console.log(data);
                        msj("Registro actualizado", 200, data, res)
                    })
                    .catch((error)=>{
                        console.log(error);
                        msj("Error al modificar los datos", 200, error, res)
                });
            }else{
                msj("ya existe la habitacion", 200, [], res);
             }
            
        }
    }   
}
};
//eliminar 
exports.eliminar = async(req, res)=>{

    const { id } = req.query;
    if( !id ){
        res.send("Debe enviar los datos completos")
    }else{
       var buscarTipo = await ModeloTipoHabitacion.findOne({
           where:{
               id:id,
           }
       });
       if(!buscarTipo){
           res.send("el id no existe");
       }else{
          
           await ModeloTipoHabitacion.destroy({
               where:{
                   id:id,
               }
           })
            .then((data)=>{
                console.log(data);
                res.send("Registro eliminado")
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar el registro")
        });
       }
        
    }
}

exports.BuscarTipoHabitacion = async (req, res) => {
    const { id } = req.query;
    const buscarTipo = await ModeloTipoHabitacion.findAll({
        where: {
            id: id
        }
    });
    if (buscarTipo.length == 0) {
        msj("No existen datos",200, [], res);
    }
    else {

        res.json(buscarTipo);
    }
};
