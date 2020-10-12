const jwt   = require('jsonwebtoken');

const generarJWT    = (uid) => {

    return new Promise( (resolve, reject) => {

        const payload = {
            uid
        };
    
    
        //el primer argumento es la firma en este caso se quiere firmar el payload,
        // el segundo argumento es la private key, en este caso tiene que ser una llave privada que nadie conozca
        //el tercer argumento tiene que ver mas con la duración del token, en este caso durara 12 horas,
        //el cuarto es un callback que retorna un error y el segundor argumento es el token.
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
    
            if(err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }else {
                resolve(token);
            }
    
        } );
        
    } )

   

};

module.exports = {
    generarJWT 
}