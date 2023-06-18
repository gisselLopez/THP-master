const ModeloEmpleadoV = require('../modelos/modeloEmpleadoVista');
const ModeloEmpleado = require('../modelos/modeloEmpleado');
const { validationResult } = require('express-validator');
const ModeloObtenerIdUsuario = require('../modelos/modeloObtenerIdUsuario');
const msj = require('../componentes/mensaje');

exports.listarEmpleados = async (req, res) => {
    const listarEmpleados = await ModeloEmpleadoV.findAll();

    if(listarEmpleados.length == 0)
    {
       msj("No existen datos", 200, [], res);
    }
    else
    {
        msj(listarEmpleados, 200, [], res);
    }
};
exports.BuscarEmpleado = async (req, res) => {
    const { id } = req.query;
    const listarEmpleados = await ModeloEmpleadoV.findOne({
        where: { 
            id:id,
        }
    });
    if (listarEmpleados.length == 0) {
        msj("No existen datos", 200, [], res)
    }
    else {

        res.json(listarEmpleados);
    }
};
exports.BuscarEmpleadoPorUsuario = async (req, res) => {
    const { id } = req.query;
    const listarEmpleados = await ModeloEmpleadoV.findOne({
        where: {
            idUsuario:id,
        }
    });
    if (listarEmpleados.length == 0) {
        msj("No existen datos", 200, [], res)
    }
    else {

        res.json(listarEmpleados);
    }
};

exports.guardarEmpleado = async (req, res) => {

    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else 
    {
        const idUsuario = await ModeloObtenerIdUsuario.findOne({});
        const {identidad, nombres, apellidos, telefono, correo, fechaNacimiento,estado} = req.body;

        if(!identidad || !nombres || !apellidos || !telefono || !correo || !fechaNacimiento || !idUsuario.id)
        {
        msj("Debe enviar los datos completos", 200, [], res)
        }
        else     
        {
            var buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: identidad
                }
            });

            var buscarEmpleadoC = await ModeloEmpleado.findOne({
                where: {
                    correo: correo
                }
            });
            
            if(buscarEmpleado)
            {
                 msj('identidad en uso', 200, [], res);
            }
            else
            {
                if(buscarEmpleadoC)
                {
                    msj('El correo ya existe', 200, [], res);
                }
                else
                {
                    await ModeloEmpleado.create({
                        identidad: identidad,
                        nombres: nombres,
                        apellidos: apellidos,
                        telefono: telefono,
                        correo: correo,
                        fechaNacimiento: fechaNacimiento,
                        estado:estado,
                        idUsuario: idUsuario.id
        
                    })
                    .then((data=>{
                        console.log(data);
                         msj("Registro almacenado", 200, data, res);
                    }))
                    .catch(error=>{
                        console.log(error);
                        msj("Error al guardar los datos", 200, error, res);
                    })

                }
                
            }
            
        }
    }
    

};


exports.modificarEmpleado = async(req, res) => 
{

    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const { id } = req.query;
        const {identidad, nombres, apellidos, telefono, correo, fechaNacimiento, idUsuario,estado} = req.body;

        if(!identidad || !nombres || !apellidos || !telefono || !correo || !fechaNacimiento || !idUsuario )
        {
            msj("Debe enviar los datos completos", 200, [], res)
        }
        else
        {
            var buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: id
                }
            });

            if(!buscarEmpleado)
            {
                 msj("El id del empleado no existe", 200, [], res);
            }
            else
            {
                var buscarEmpleadoID = await ModeloEmpleado.findOne({
                    where: {
                        identidad: identidad
                    }
                });

                if(!buscarEmpleadoID || buscarEmpleadoID.identidad == buscarEmpleado.identidad)
                {
                    buscarEmpleado.identidad = identidad;
                    buscarEmpleado.nombres = nombres;
                    buscarEmpleado.apellidos = apellidos;
                    buscarEmpleado.telefono = telefono;            
                    buscarEmpleado.correo = correo;
                    buscarEmpleado.estado=estado;
                    buscarEmpleado.fechaNacimiento = fechaNacimiento;
                    buscarEmpleado.idUsuario = idUsuario;


                    await buscarEmpleado.save()
                    .then((data) => {
                        console.log(data);
                        msj("Registro actualizado", 200, data, res)
                    })
                    .catch((error) =>{
                        console.log(error);
                         msj("Error al modificar los datos", 200, error, res)
                    });
                }
                else
                {
                     msj("identidad en uso")
                }

                
            }
            
        }
    }
    
    
    
};



exports.DesactivarEmpleado = async (req, res) => {
 
    const { id } = req.query;

        var buscarEmpleadoID = await ModeloEmpleado.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarEmpleadoID) {
            msj("El ID no existe",200, [], res);
        }
        else {   

            buscarEmpleadoID.estado= "Inactivo"

            await buscarEmpleadoID.save()
            .then((data) => {
                console.log(data);
                msj("Registro actualizado",200, data, res);
            }).catch((error) => {
                msj("Error al actualizar los datos",200, error, res);
            });
        }
    
}

exports.elimarEmpleado = async(req, res)=>
{
    const { id } = req.query;

    if(!id)
    {
         msj("envie el id del empleado", 200, data, res)
    }
    else
    {
        await ModeloEmpleado.destroy({
            where:
            {
                id: id,
            }
        })
        .then((data)=>{
            if(data == 0)
                {
                    msj("el id no existe", 200, data, res)
                }
                else
                {
                     msj("Registro eliminado", 200, data, res)
                }
        })
        .catch((error) =>{
            console.log(error);
             msj("Ha ocurrido un error al eliminar", 200, data, res)
        });
    }
};

