const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true, unique:true},
    contrasena: {type: String, required: true},
    tareas: [
        {
        nombre_tarea: String,
        prioridad: Number,
        fecha_vencimiento: Date,
        estado: {type:Boolean, default:false},
        imagen: String
        }
    ]
})

module.exports = model('users',userSchema);
