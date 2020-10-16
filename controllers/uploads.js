const { response }          = require("express");
const path                  = require('path');//Esto ya viene en node
const {v4: uuidv4}          = require('uuid');
const { actualizarImagen }  = require("../helpers/actualizar-imagen");
const fs                    = require('fs');


const fileUpload    = (req, res = response) => {

    const tipo  = req.params.tipo;
    const id    = req.params.id;

    const tiposValidos  = ['medicos', 'hospitales', 'usuarios'];

    try {
        
        if(!tiposValidos.includes(tipo)){
            return res.status(400).json({
                ok: false,
                msg: 'No es un médico, usuario u hospital (tipo)'
            });
        }


        //Validar que exiasta un archivo
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'no envio ningun archivo'
            })
        }

        //Procesar la imagen
        const file  = req.files.imagen;//se le coloca imagen por lo que pusimos en el body form-data de postman
        const nombreCortado = file.name.split('.');
        const extensionArchivo  = nombreCortado[nombreCortado.length -1];
        const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];

        if(!extensionesValidas.includes(extensionArchivo)){
            res.status(400).json({
                ok: false,
                msg: 'La extension del archivo no es valida'
            });
        }

        //poniendole un nombre unico a cada archivo

        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

        //Path para guardar la imagen
        const path  = `uploads/${tipo}/${nombreArchivo}`;

        //Mover la imagen
        file.mv( path, (err) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    error: 'Error al mover la imagen'
                });
            }
        });

        //Actualizar vase de datos
        actualizarImagen(tipo, id, nombreArchivo);


        res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

};

const retornarImagen    = (req, res = response) => {

    const tipo      = req.params.tipo;
    const foto      = req.params.foto;

    const pathimg   = path.join(__dirname, `./../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if(fs.existsSync(pathimg)){
        res.sendFile( pathimg );
        
    }else {
        const pathimg   = path.join(__dirname, `./../uploads/itachi.png`);

        res.sendFile(pathimg);
    }





};


module.exports  = {
    fileUpload,
    retornarImagen
}