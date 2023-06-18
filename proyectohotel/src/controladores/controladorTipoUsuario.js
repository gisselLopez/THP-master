const ModeloTipoUsuario = require('../modelos/modeloTipoUsuraio');


exports.listarTiposUsuarios = async (req, res) => {
    const listarTiposUsuarios = await ModeloTipoUsuario.findAll();

    if(listarTiposUsuarios.length == 0)
    {
        res.send("No existen datos");
    }
    else
    {
        res.json(listarTiposUsuarios);
    }
};

exports.guardarTipoUsuario = async (req, res) => {
    const {tipoUsuario} = req.body;

    if(!tipoUsuario)
    {
       res.send("Debe enviar los datos completos");
    }
    else
    {
        await ModeloTipoUsuario.create({
            
            tipoUsuario: tipoUsuario
            

        })
        .then((data=>{
            console.log(data);
            res.send("Registro Alamacenado");
        }))
        .catch(error=>{
            console.log(error);
            res.send("Error al guardar los datos");
        })
    }

};

exports.modificarTipoUsuario = async(req, res) => 
{
    
    const { id } = req.query;
    const { tipoUsuario } = req.body;
    if(!id || !tipoUsuario)
    {
        res.send("Debe enviar los datos completos");
    }
    else
    {
        var buscarTipoUsuario = await ModeloTipoUsuario.findOne({
            where: {
                id: id
            }
        });

        if(!buscarTipoUsuario)
        {
            res.send("El id no existe")
        }
        else
        {
            console.log(buscarTipoUsuario.tipoPersona);
            buscarTipoUsuario.tipoUsuario = tipoUsuario;
         
       
           

            await buscarTipoUsuario.save()
            .then((data) => {
                console.log(data);
                res.send("Registro actualizado");
            })
            .catch((error) =>{
                console.log(error);
                res.send("Ha ocurrido un error al actualizar");
            });

            
        }
        
    }
    
};

exports.eliminarTipoUsuario = async(req, res) => 
{
    
    const { id } = req.query;
   
    if(!id)
    {
        res.send("Debe enviar el id de la persona");
    }
    else
    {
      
        
            await ModeloTipoUsuario.destroy({
                where: 
                {
                    id: id,
                }
            })
            .then((data) => {
                console.log(data);

                if(data == 0)
                {
                    res.send("El id no existe");
                }
                else
                {
                    res.send("Registro elminado");
                }
               
            })
            .catch((error) =>{
                console.log(error);
                res.send("Ha ocurrido un error al eliminar");
            });

          

            
        
        
    }
    
};