const enviarCorreo = require('../configuraciones/correo');
const ModeloEmpleado = require('../modelos/modeloEmpleado');
const ModeloCliente = require('../modelos/modeloCliente');
const ModeloUsuario= require('../modelos/modeloUsuario');
const { validationResult} = require('express-validator');
const passport = require('../configuraciones/passport');
const msj = require('../componentes/mensaje');

exports.recuperarContrasena =  async (req, res) => {
    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const { correo } = req.body;
        var buscarUsuarioE = await ModeloEmpleado.findOne({
            where:
            {
                correo: correo
            }
        });

        var buscarUsuarioC = await ModeloCliente.findOne({
            where:
            {
                correo: correo
            }
        });

        
        const pin = Math.floor(Math.random() * (10000000 + 999999999)) + 10000000;

        if (buscarUsuarioE || buscarUsuarioC)
        {
            const data = {
                correo: correo,
                pin: pin,
            }

            var buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    id: buscarUsuarioC.idUsuario, 
                    estado: "Habilitado"
                }
            });

            

            if(enviarCorreo.recuperarContrasena(data))
            {
                console.log(pin);
               
                buscarUsuario.contrasenia = pin.toString();
                
                await buscarUsuario.save()
                .then((data) => {
                    console.log(data);
                    msj("Revise su correo electronico", 200, data, res);
                })
                .catch((error) =>{
                    console.log(error);
                    msj("Error al enviar el correo electronico", 200, error, res);
                    console.log(error);
                });
            }
            else
            {
                msj("Error al enviar el correo electronico", 200, [], res);
            }
            
        }
        else
        {
            msj("El correo ingresado es invalido", 200, [], res);
        }
    }
};



exports.ValidarAutenticado = passport.ValidarAutenticado;
exports.InicioSesion = async (req, res) => 
{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
        msj("Los datos son invalidos", 200, validacion.array(), res);
    }
    else
    {
        const {usuario, contrasenia} = req.body;
        const buscarUsuario = await ModeloUsuario.findOne({
            where: 
            {
                usuario: usuario
            }
        });

        if(!buscarUsuario)
        {
            msj("El usuario o contraseña son incorrectos", 200, [], res);
        }
        else
        {
            if(!buscarUsuario.VerificarContrasenia(contrasenia, buscarUsuario.contrasenia))
            {
                msj("El usuario o contraseña son incorrectos", 200, [], res);
            }
            else
            {
                const Token = passport.generarToken({id: buscarUsuario.id});
                const data = {
                    token: Token,
                    data: buscarUsuario
                };
                msj("Bienvenido", 200, data, res);
            }
        }
    }
};

exports.Error = (req, res) => {
    msj("Debe estar autenticado", 200, [], res);
};