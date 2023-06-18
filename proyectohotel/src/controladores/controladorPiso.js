const ModeloPiso = require('../modelos/modeloPiso');
const msj = require('../componentes/mensaje');



exports.ListarPiso = async (req, res) => {
    const listarPiso = await ModeloPiso.findAll();
    if(listarPiso.length==0){
        msj("No existen datos",200, [], res);
    }
    else{
        res.json(listarPiso);
    }
};



exports.BuscarPiso = async (req, res) => {
    const { id } = req.query;
    const listarPiso = await ModeloPiso.findAll({
        where: {
            id: id
        }
    });
    if (listarPiso.length == 0) {
        msj("No existen datos",200, [], res);
    }
    else {

        res.json(listarPiso);
    }
};



exports.guardarPiso = async (req, res) => {

    
  
        const {numPiso, capacidad} = req.body;
        if(!numPiso || !capacidad ){
            msj("Debe enviar los datos completos!",200, [], res);
        }
        else{
            await ModeloPiso.create({
                numPiso: numPiso,
                capacidad: capacidad,

            })
            .then((data)=>{
                console.log(data);
                msj("Registro almacenado!",200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Hubo un error!",200, [], res);
            });
        }

};



exports.modificarPiso= async (req, res) => {

    
    console.log(req.query);
    console.log(req.body);
    const {id} = req.query;
    const{numPiso, capacidad, estado}= req.body;
    if(!numPiso || !capacidad || !estado){
        msj("No se enviaron todos los datos!",200, [], res)
    }
    else{
        var buscarPiso = await ModeloPiso.findOne({
            where:{
                id: id,
            }
        });
        if(!buscarPiso){
            msj("Este id no existe!",200, [], res)
        }
        else{
            console.log(buscarPiso);
            buscarPiso.numPiso = numPiso;
            buscarPiso.capacidad = capacidad;
            buscarPiso.estado = estado;
        
            await buscarPiso.save()
            .then((data)=>{
                console.log(data);
                msj("Registro actualizado!",200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al actualizar los datos!",200, [], res);
            })
        }
    } 
};

exports.DesactivarPiso = async (req, res) => {

    const { id } = req.query;

        var buscarPisoid = await ModeloPiso.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarPisoid) {
            msj("El ID no existe",200, [], res);
        }
        else {
            

            buscarPisoid.estado= "Inactivo"

            await buscarPisoid.save()
            .then((data) => {
                console.log(data);
                msj("Registro actualizado",200, data, res);
            }).catch((error) => {
                msj("Error al actualizar los datos",200, error, res);
            });
        }
    

}


exports.eliminarPiso= async (req, res) => {

    
    const {id} = req.query;
    if(!id){
        msj("Envie el id del registro",200, [], res)
    }
    else{
        var buscarPiso = await ModeloPiso.findOne({
            where:{
                id: id,
            }
        });
        if(!buscarPiso){
            msj("El id no existe!",200, [], res)
        }
        else{
            await ModeloPiso.destroy({
                where:
                {
                    id: id,
                }
                
            })
            .then((data)=>{
                console.log(data);
                msj("Registro eliminado!",200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al eliminar los datos!",200, [], res);
            })
        }
    }

};