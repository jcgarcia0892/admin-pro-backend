const fs        = require('fs');//File systems con esto se puede leer el file system, es decir las carpetas y los archivos y trabajar con eso.
const Usuario   = require('./../models/usuario');
const Medico   = require('./../models/medico');
const Hospital   = require('./../models/hospital');


const borrarImagen  = (path) => {

     //Con esto vemos si existe un archivo en esa ruta
     if(fs.existsSync(path)){
        //Como si existe con esto borramos ese archivo
        fs.unlinkSync( path );
    }

}

const actualizarImagen  = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'usuarios':
        
            const usuario    = await Usuario.findById(id);
            if(!usuario) {
                console.log('No existe médico');
                return false;
            }
            pathViejo = `./uploads/usuario/${ usuario.img }`;
            
            borrarImagen(pathViejo);

            usuario.img  = nombreArchivo;

            await usuario.save();
            return true;

        break;

        case 'medicos':
            
            const medico    = await Medico.findById(id);
            if(!medico) {
                console.log('No existe médico');
                return false;
            }
            pathViejo = `./uploads/medico/${ medico.img }`;
            
            borrarImagen(pathViejo);

            medico.img  = nombreArchivo;

            await medico.save();
            return true;

            
            
        break;

        case 'hospitales':
            
            const hospital    = await Hospital.findById(id);
            if(!hospital) {
                console.log('No existe médico');
                return false;
            }
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            
            borrarImagen(pathViejo);

            hospital.img  = nombreArchivo;

            await hospital.save();
            return true;

        break;
    
        default:
            break;
    }

}

module.exports  = {
    actualizarImagen
}