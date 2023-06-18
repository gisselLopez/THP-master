/*const fs =require('fs');
const path = require('path');
const msj = require('../componentes/mensaje');
const ModeloPersona = require('../modelos/modeloPersona');
exports.Recibir = async(req,res)=>{
    const {filename }= req.file;
    const id = req.query;
    var BuscarPersona = await ModeloPersona.findOne({
        where : {
            id:id
        }
    });
    if(!BuscarPersona){
        msj("El usuario no existe",200,[], res);
    }else{
        const buscarImagen = fs.existsSync(path.join(__dirname,'../public/img'+
        BuscarPersona.imagen));
        if(!buscarImagen){
            console.log("La imagen no existe");
        }else{
            try{
                fs.unlinkSync(path.join(__dirname,'../public/img'+BuscarPersona.imagen));
                console.log("Imagen eliminada");
            }
            catch(error){
                console.log(error);
                console.log("No se elimino");
            }
        }
        BuscarPersona.imagen=filename;
        await BuscarPersona.save()
        .then((data)=>{
            msj("Imagen actualizada", 200,[],res);
        })
        .catch((error)=>{
            console.log("error");
                msj("Error la guardar la imagen", 200,[],res);
        });
    }
}
*/
const fs = require('fs');
const path = require('path');
const msj = require('../componentes/mensaje');
const ModeloTipoHabitacion = require('../modelos/modeloTipoHabitacion');
exports.Recibir = async(req,res)=>{
    const {filename }= req.file;
    const {id} = req.query;
    var BuscarTipo = await ModeloTipoHabitacion.findOne({
        where : {
            id:id
        } 
    });
    if(!BuscarTipo){
        msj("La el tipo habitación no existe",200,{filename: filename + ''}, res);
    }else{
        const buscarImagen = fs.existsSync(path.join(__dirname,'../public/img/'+
        BuscarTipo.imagen));
        console.log(BuscarTipo.imagen);
        if(!buscarImagen){
            console.log("La imagen no existe");
        }else{
            try{
               
                fs.unlinkSync(path.join(__dirname,'../public/img/'+ BuscarTipo.imagen));
                console.log("Imagen eliminada");
            }
            catch(error){
                console.log(error);
                console.log("No se elimino");
            }
        }
       
        BuscarTipo.imagen=filename;
        await BuscarTipo.save()
        .then((data)=>{
            msj("Imagen actualizada", 200,data,res);
        })
        .catch((error)=>{
            console.log(error);
                msj("Error la guardar la imagen", 200,error,res);
        });
    };
}

exports.eliminar = async(req,res)=>{
    const {filename }= req.body;
  
    try{
        
        fs.unlinkSync(path.join(__dirname,'../public/img/'+ filename));
        msj("Imagen eliminada", 200,[],res);
    }
    catch(error){
        console.log(error);
     
        msj("No se eliminó", 200,[],res);
    }
  
   
}