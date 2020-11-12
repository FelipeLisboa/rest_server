const jwt = require('jsonwebtoken');


//=====================
//VERIFICAR TOKEN
//=====================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario; //decoded es el payload
        next();
    });
}

//=====================
//VERIFICAR ADMIN ROLE
//=====================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'El usuario no es administrador'
        });
    }
}


module.exports = {
    verificaToken,
    verificaAdmin_Role
}