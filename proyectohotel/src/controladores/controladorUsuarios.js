const ModeloUsuarioV = require('../modelos/modeloUsuarioVista');
const ModeloUsuario = require('../modelos/modeloUsuario');
const { validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');
exports.ListarUsuarios = async (req, res) => {
    const ListarUsuarios = await ModeloUsuarioV.findAll();

    if(ListarUsuarios.length == 0)
    {
        msj("No existen datos");
    }
    else
    {
        res.json(ListarUsuarios);
    }
};

exports.guardarUsuario = async (req, res) => {
    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {usuario, contrasenia, idTipo, estado} = req.body;

        if(!usuario || !contrasenia || !idTipo )
        {
            
            msj("Debe enviar los datos completo", 200, [], res);
        }
        else
        {
            var buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    usuario: usuario
                }
            });
            
            if(buscarUsuario)
            {
                
                msj("El nombre de usuario ya existe", 200, [], res);
            }
            else
            {
                await ModeloUsuario.create({
                    usuario: usuario,
                    contrasenia: contrasenia,
                    idTipo: idTipo,
                    estado: estado
                    
                })
                .then((data=>{
                    console.log(data);
                    msj("Usuario guardado", 200, data, res);
                }))
                .catch(error=>{
                    console.log(error);
                    msj("Error al guardar los datos", 200, [], res);
                })
            }

            
        }
    }
    

};

exports.modificarUsuario = async(req, res) => 
{
    console.log(req);
    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const { id } = req.query;
        const {usuario, contrasenia} = req.body;
        if(!id || !usuario || !contrasenia)
        {
            msj("Debe enviar los datos completos", 200, [], res);;
        }
        else
        {
            var buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    id: id, 
                    estado: "Habilitado"
                }
            });

            if(!buscarUsuario)
            {
                msj("El id no existe o el usuario esta inhabilitado", 200, [], res);
            }
            else
            {
                
                buscarUsuario.contrasenia = contrasenia;
                buscarUsuario.usuario = usuario;
            
                await buscarUsuario.save()
                .then((data) => {
                    console.log(data);
                    msj("Registro actualizado", 200, data, res);;
                })
                .catch((error) =>{
                    console.log(error);
                    msj("Ha ocurrido un error al actualizar", 200, error, res);;
                });

                
            }
            
        }
    }
    
    
};

exports.modificarEstado= async(req, res) => 
{
    
    const { id } = req.query;
    const {estado} = req.body;
    if(!id || !estado)
    {
        msj("Debe enviar los datos completos");
    }
    else
    {
        var buscarUsuario = await ModeloUsuario.findOne({
            where: {
                id: id
            }
        });

        if(!buscarUsuario)
        {
            msj("El id no existe")
        }
        else
        {
            
            buscarUsuario.estado = estado;
           
            await buscarUsuario.save()
            .then((data) => {
                console.log(data);
                msj("Registro actualizado");
            })
            .catch((error) =>{
                console.log(error);
                msj("Ha ocurrido un error al actualizar");
            });  
        }
        
    }
    
};

exports.elimarUsuario = async(req, res)=>
{
    const { id } = req.query;

    if(!id)
    {
        msj("Envié el id del usuario", 200, [], res);
    }
    else
    {
        await ModeloUsuario.destroy({
            where:
            {
                id: id,
            }
        })
        .then((data)=>{
            if(data == 0)
                {
                    msj("El id no existe", 200, data, res);
                }
                else
                {
                    msj("Registro elminado", 200, data, res);
                }
        })
        .catch((error) =>{
            console.log(error);
            msj("Ha ocurrido un error al eliminar", 200, error, res);
        });
    }
};