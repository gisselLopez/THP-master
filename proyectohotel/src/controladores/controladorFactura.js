const ModeloFacturaVista = require('../modelos/modeloFacturaVista');
const ModeloFactura = require('../modelos/modeloFactura');

const { validationResult } = require('express-validator');

const msj = require('../componentes/mensaje');



exports.ListarFactura = async (req, res) => {
    const listarFactura = await ModeloFacturaVista.findAll({});
    if (listarFactura.length == 0) {
        msj("No existen datos",200, [], res);
    }
    else {

        res.json(listarFactura);
    }
};

exports.BuscarFacturaId = async (req, res) => {
    const { id } = req.query;
    const listarFactura = await ModeloFacturaVista.findAll({
        where: {
            id: id
        }
    });
    if (listarFactura.length == 0) {
        msj("No existen datos",200, [], res);
    }
    else {

        res.json(listarFactura);
    }
};

exports.BuscarFactura = async (req, res) => {
    const { filtro } = req.query;
    const listarFactura = await ModeloFacturaVista.findAll({
        where: {
            nombreCliente: filtro
        }
    });
    if (listarFactura.length == 0) {
        msj("No existen datos",200, [], res);
    }
    else {

        res.json(listarFactura);
    }
};


exports.GuardarFactura = async (req, res) => {
    const validacion = validationResult(req);
    console.log(validacion);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { idReservacion, idTipoPago } = req.body;
        if (!idReservacion || !idTipoPago) {

            msj("Debe enviar los datos completos",200, [], res);
        }
        else {
            const buscarFactura = await ModeloFactura.findOne({
                where: {
                    idReservacion: idReservacion
                }
            });

            
            if (buscarFactura) {
                msj("Esta reservacion ya fue pagada",200, [], res);
            }
            else {
                await ModeloFactura.create(
                    {
                        idReservacion: idReservacion,
                        idTipoPago: idTipoPago

                    }
                )
                    .then((data) => {
                        console.log(data);
                        msj("Registro Almacenado",200, data, res);
                    })
                    .catch((error) => {
                        console.log(error);
                        msj("Error al guardar los datos",200, error, res);
                    });
            }

        }
    }
}


exports.ActualizarFactura = async (req, res) => {

    const { id } = req.query;
    const { idReservacion, idTipoPago, estado } = req.body;
    if (!idReservacion || !idTipoPago) {

        msj("Debe enviar los datos completos",200, [], res);
    }
    else {
        var buscarFacturaId = await ModeloFactura.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarFacturaId) {
            msj("El ID no existe",200, [], res);
        }
        else {
            const buscarFactura = await ModeloFactura.findOne({
                where: {
                    idReservacion:idReservacion
                }
            });

            if (!buscarFactura || (buscarFacturaId.idReservacion == idReservacion)) {
                

                buscarFacturaId.idReservacion= idReservacion,
                buscarFacturaId.idTipoPago= idTipoPago,
                buscarFacturaId.estado= estado

                await buscarFacturaId.save()
                .then((data) => {
                    console.log(data);
                    msj("Registro almacenado",200, data, res);
                }).catch((error) => {
                    msj("Error al actualizar los datos",200, error, res);
                });
            }
            else
            {
                msj("Esta reservacion ya fue pagada",200, [], res);
            }
            

            

        }
    }

}


exports.DesactivarFactura = async (req, res) => {

    const { id } = req.query;

        var buscarFacturaId = await ModeloFactura.findOne({
            where:
            {  
                id: id,
            }
        }
        );
        if (!buscarFacturaId) {
            msj("El ID no existe",200, [], res);
        }
        else {
            

            buscarFacturaId.estado= "Inactivo"

            await buscarFacturaId.save()
            .then((data) => {
                console.log(data);
                msj("Registro actualizado",200, data, res);
            }).catch((error) => {
                msj("Error al actualizar los datos",200, error, res);
            });
        }
    

}


exports.EliminarFactura = async (req, res) => {

    const { id } = req.query;


    if (!id) {
        res.send("Envie el id del registro");
    }
    else {
        var buscarFactura = await ModeloFactura.findOne({
            where:
            {   
                id: id,
            }
        }
        );
        if (!buscarFactura) {
            res.send("El id no existe");
        }

        else {
            await buscarFactura.destroy({
                where:
                {
                    id: id,
                }

            })
                .then((data) => {
                    console.log(data); 
                    if (data == 0) {
                        res.send("El ID no existe");
                    }
                    else {
                        res.send("Registro eliminado");
                    }

                }).catch((error) => {
                    res.send("Error al eliminar los datos");
                });

        }
    }

}



