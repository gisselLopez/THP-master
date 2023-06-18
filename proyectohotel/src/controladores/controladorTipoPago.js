const ModeloTipoPago = require('../Modelos/modeloTipoPago');
const msj = require('../componentes/mensaje');


exports.ListarTiposPago = async (req, res) => {
    const listartipospagos = await ModeloTipoPago.findAll();
    if(listartipospagos.length==0){
        msj("No existen datos");
    }
    else{
        msj(listartipospagos,200, [], res);
    }

};
exports.guardarTipoPago = async (req, res) => {
   const{tipoPago, estado} = req.body;
   if(!tipoPago)
    {
       msj("Debe enviar los datos completos",200, [], res);
    } 
        const buscarTipo = await ModeloTipoPago.findOne({
            where:{
                tipoPago:tipoPago
            }  
        }); 
     
        if(buscarTipo){
            msj("ya existe el tipo de pago", 200, [], res);
            }  

            else{
                await ModeloTipoPago.create({
                    tipoPago: tipoPago,
                                
                })
                .then((data)=>{
                    console.log(data);
                    msj("Registro almacenado", 200, data, res)
                })
                .catch((error)=>{
                    console.log(error);
                    msj("Error al guardar los datos", 200, error, res);
                });

            }
    
   
   
   
    /*  const {tipoPago} = req.body;
    const {estado} = req.body;
   
    console.log(tipoPago);
    if(!tipoPago)
    {
       msj("Debe enviar los datos completos",200, [], res);
    }
    else
    {
        await ModeloTipoPago.create({    
            tipoPago: tipoPago,
            estado:estado
        })

        .then((data=>{
            console.log(data);
           msj("Registro Alamacenado",200, [], res);
        }))
        .catch(error=>{
            console.log(error);
            msj("Error al guardar los datos",200, [], res);
        });
    }
    
*/

};

exports.modificarTipoPago = async(req, res) => 
{   
    const{id, tipoPago, estado} = req.body;
    if(!id || !tipoPago|| !estado)
    {
        msj("Debe enviar los datos completos", 200, error, res);
    }
        var buscarTipo = await ModeloTipoPago.findOne({
            where:{
                id:id,
            }
        });
        if(!buscarTipo){
            msj("el id no existe", 200, error, res)    
        }else{
            var buscarTipoID = await this.modificarTipoPago.findOne({
                where:{
                    tipoPago:tipoPago,
                }
            });
             if(!buscarTipoID || buscarTipoID.tipoHabitacion == buscarTipo.tipoHabitacion){
                
                buscarTipo.tipoPago=tipoPago;
                buscarTipo.estado=estado;
                
                await buscarTipo.save()
                    
                    .then((data)=>{
                        console.log(data);
                        msj("Registro actualizado", 200, error, res)
                    })
                    .catch((error)=>{
                        console.log(error);
                        msj("Error al modificar los datos", 200, error, res)
                });
            }else{
            res.send("ya existe el tipo de pago")
             }
            
        }
    

    /*
     
      const { id } = req.query;
    const { tipoPago } = req.body;
    const {estado} = req.body;
    if(!id || !tipoPago|| !estado)
    {
        msj("Debe enviar los datos completos");
    }
    else
    {
        var buscarTipoPago = await ModeloTipoPago.findOne({
            where: {
                id: id
            }
        });

        if(!buscarTipoPago)
        {
            msj("El id no existe")
        }
        else
        {
            console.log(buscarTipoPago.tipoPago);
            buscarTipoPago.tipoPago = tipoPago;
            buscarTipoPago.estado= estado;
            await buscarTipoPago.save()
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
    */
    
};

exports.eliminarTipoPago = async(req, res) => 
{
    
    const { id } = req.query;
   
    if(!id)
    {
       msj("Debe enviar el id del tipo de pago");
    }
    else
    {

            await ModeloTipoPago.destroy({
                where: 
                {
                    id: id,
                }
            })
            .then((data) => {
                console.log(data);

                if(data == 0)
                {
                    msj("El id no existe");
                }
                else
                {
                    msj("Registro elminado");
                }
               
            })
            .catch((error) =>{
                console.log(error);
                msj("Ha ocurrido un error al eliminar");
            });
    }
    
};