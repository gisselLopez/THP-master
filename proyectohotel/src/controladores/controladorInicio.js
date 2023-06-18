exports.Raiz = (req, res) => {
    console.log(req);
    const jsonTexto = '{"nombre":"Angel","seccion":"1801","clase":"ProgramacionMovilII"}';
    var alumno = JSON.parse(jsonTexto);
    console.log("gracias Dios");
    res.send(alumno);
};

exports.otra = (req, res)=> {
    console.log("Dios me ama");
    res.send("correcto");
};

exports.otra2 = (req, res)=> {
    console.log("Mi confianza vive en Dios.");
    res.send("Dios te amo, por todo, gracias hermano Jesus!");
};