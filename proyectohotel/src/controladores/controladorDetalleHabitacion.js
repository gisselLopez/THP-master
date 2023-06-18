const ModelosDetalleH = require('../modelos/modeloDetalleHabitacion');
const ModelosUltimaReservacion = require('../modelos/modelUltimaReservacion');
const msj = require('../componentes/mensaje');

exports.listardetalles = async (req, res) => {
    const listardetalles = await ModelosDetalleH.findAll();

    if(listardetalles.length == 0)
    {
        res.send("No existen datos");
    }
    else
    {
        res.json(listardetalles);
    }
};

exports.guardarDetalleHabitacion = async (req, res) => {
    const idReservacion =  await ModelosUltimaReservacion.findOne();
    const {idHabitacion} = req.body;
    if(!idReservacion || !idHabitacion ){
        msj("Deve enviar los datos completos", 200, [], res);
    }
    else{
        await ModelosDetalleH.create({
            idReservacion: idReservacion.id,
            idHabitacion: idHabitacion,
          
        
        })
        .then((data)=>{
            console.log(data);
            msj("Habitacion reservada", 200, data, res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Ocurrio un error", 200, [], res);
        });
    }

};



exports.modificarDetalleHabitacion= async (req, res) => {
    const {idReservacion, idHabitacion} = req.query;
    const {idh, idr} = req.body;
    if(!idHabitacion){
        res.send("Envie el id del registro")
    }
    else{
        var buscarDetalleHabitacion = await ModelosDetalleH.findOne({
            where:{
                idReservacion: idReservacion,
                idHabitacion: idHabitacion
            }
        });
        if(!buscarDetalleHabitacion){
            res.send("El id no existe!")
        }
        else{
            await ModelosDetalleH.destroy({
                where:
                {
                    idReservacion: idReservacion,
                    idHabitacion: idHabitacion
                }
                
            })
            await ModelosDetalleH.create({
                idHabitacion: idh,
                idReservacion: idr,
            
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


};

exports.eliminarDetalleHabitacion= async (req, res) => {
    const {idHabitacion, idReservacion} = req.query;
    if(!idHabitacion){
        res.send("Envie el id del registro")
    }
    else{
        var buscarDetalleHabitacion = await ModelosDetalleH.findOne({
            where:{
                idHabitacion: idHabitacion,
                idReservacion: idReservacion
            }
        });
        if(!buscarDetalleHabitacion){
            res.send("El id no existe!")
        }
        else{
            await ModelosDetalleH.destroy({
                where:
                {
                    idHabitacion: idHabitacion,
                    idReservacion: idReservacion
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

};

