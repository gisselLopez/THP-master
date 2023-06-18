const ModeloCliente = require('../modelos/modeloCliente');
const ModeloClienteV = require('../modelos/modeloClienteV');
const { validationResult } = require('express-validator');
const ModeloObtenerIdUsuario = require('../modelos/modeloObtenerIdUsuario');
const msj = require('../componentes/mensaje');
exports.ListarCliente = async(req, res)=>{
    const listarCliente = await ModeloClienteV.findAll();
    if(listarCliente.length==0){
     msj("No existen datos", 200, [], res);
    }else{
        msj(listarCliente, 200, [], res);

    } 
};

exports.BuscarCliente = async (req, res) => {
    const { id } = req.query;
    const listarCliente = await ModeloClienteV.findOne({
        where: {
            id:id,
        }
    });
    if (listarCliente.length == 0) {
        msj("No existen datos", 200, [], res)
    }
    else {

        res.json(listarCliente);
    }
};

exports.BuscarClientePorUsuario = async (req, res) => {
    const { id } = req.query;
    const listarCliente = await ModeloClienteV.findOne({
        where: {
            idUsuario:id,
        }
    });
    if (listarCliente.length == 0) {  
        msj("No existen datos", 200, [], res)
    }
    else {

        res.json(listarCliente); 
    }
}; 



exports.guardar = async(req, res)=>{

    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
     const idUsuario = await ModeloObtenerIdUsuario.findOne({});
     const{ identidad, nombres, apellidos,telefono,correo,direccion} = req.body;
            if( !identidad || !nombres || !apellidos || !idUsuario.id || !correo || !telefono){
               msj("Debe enviar los datos completos", 200, [], res)
            }else{
                 const buscarCliente = await ModeloCliente.findOne({
                     where:{
                         identidad:identidad
                     }  
                 }); 
                 const buscarClienteC = await ModeloCliente.findOne({
                    where:{
                        correo:correo
                    }  
                }); 
                    if(buscarCliente){
                       msj('Identidad en uso', 200, [], res);
                    }else{
                        if(buscarClienteC)
                        {
                            msj('El correo ya existe', 200, [], res);
                        }
                        else
                        {
                            await ModeloCliente.create({
                                identidad:identidad,
                                nombres: nombres,
                                apellidos: apellidos,
                                idUsuario:idUsuario.id,
                                telefono:telefono,
                                correo:correo,
                                direccion:direccion  
        
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
        const{ identidad, nombres, apellidos, idUsuario,telefono,correo,direccion,estado} = req.body;
        if(  !identidad || !nombres || !apellidos || !idUsuario || !correo || !telefono){
            msj("Debe enviar los datos completos", 200, [], res)
        }else{
            var buscarCliente = await ModeloCliente.findOne({
                where:{
                    id:id,
                }
            });
            if(!buscarCliente){
               msj("El id del no existe", 200, [], res);
            }else{
                var buscarClienteID = await ModeloCliente.findOne({
                where:{
                    identidad:identidad
                }
            });
            if(!buscarClienteID || buscarClienteID.identidad == buscarCliente.identidad){
                
                buscarCliente.identidad=identidad;
                buscarCliente.nombres=nombres;
                buscarCliente.apellidos=apellidos;
                buscarCliente.correo=correo;
                buscarCliente.direccion=direccion;
                buscarCliente.telefono=telefono;
                buscarCliente.correo=correo;
                buscarCliente.estado=estado;
                idUsuario.idUsuario=idUsuario;

                await buscarCliente.save()
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



exports.DesactivarCliente = async (req, res) => {

    const { id } = req.query;

        var buscarClienteID = await ModeloCliente.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarClienteID) {
            msj("El ID no existe",200, [], res);
        }
        else {   

            buscarClienteID.estado= "Inactivo"

            await buscarClienteID.save()
            .then((data) => {
                console.log(data);
                msj("Registro actualizado",200, data, res);
            }).catch((error) => {
                msj("Error al actualizar los datos",200, error, res);
            });
        }
    
}

exports.eliminar = async(req, res)=>{
    const { id } = req.query;
    if( !id ){
        res.send("Debe enviar los datos completos")
    }else{
       var buscarCliente = await ModeloCliente.findOne({
           where:{
               id:id,
           }
       });
       if(!buscarCliente){
           res.send("el id no existe");
       }else{

           await ModeloCliente.destroy({
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
};