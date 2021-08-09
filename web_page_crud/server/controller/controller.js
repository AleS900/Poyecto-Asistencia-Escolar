var Userdb = require('../model/model');
var moment = require('moment');
// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "El espacio no puede estar vacío!"});
        return;
    }
    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status,
    })
    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add_user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Se produjo un error al crear una operación de creación"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Usuario no encontrado con ID "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "ERROR recuperando usuario con ID" + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Se produjo un error al recuperar la información del usuario" })
            })
    }


}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Los datos para actualizar no pueden estar vacíos"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede actualizar el usuario con ID: ${id}. ¡Quizás no se encuentra el usuario!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "ERROR actualizando la información"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede eliminar el usuario con ID: ${id}. Quizas la ID sea incorrecta.`})
            }else{
                res.send({
                    message : "\n" +
                        "¡El usuario fue eliminado correctamente!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "No se puede eliminar el usuario con ID:" + id
            });
        });
}

// Import in hour
//exports.index = function(req, res) {
//    res.render('add_user', { moment: moment });
//}