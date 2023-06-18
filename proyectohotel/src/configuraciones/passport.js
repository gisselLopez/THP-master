const passport = require('passport');
const ModeloUsuario = require('../modelos/modeloUsuario');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duration = moment.duration(50, "m").asSeconds();
const clave = 'mySafetyPassword';

exports.generarToken = (data) =>
{
    return JWT.sign(data, clave, {expiresIn: duration});
}

const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use( new estrategiaJWT(opciones, async(payload, done) =>{
    return await ModeloUsuario.findOne({
        where:
        {
            id: payload.id
        }
    })
    .then((data) =>{
        return done(null, data.id);
    })
    .catch((error) => {
        return done(null, false)
    })
}));

exports.ValidarAutenticado = passport.authenticate('jwt',{session: false, failureRedirect: 
    '/api/autenticacion/error'})
