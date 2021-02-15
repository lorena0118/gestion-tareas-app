const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken')
const users = require('../models/users')



//Registrar un nuevo usuario
router.post('/SignUp', async (req, res) => {
    const { nombre, correo, contrasena } = req.body
    const token = jwt.sign(contrasena, 'token_contrasena');
    const newUser = new users({ nombre, correo, contrasena: token })
    try {
        await newUser.save()
        res.send('user created').status(200)
    } catch (error) {
        console.log(error)
    }


})

//Validar usuario existente

router.get('/login', async (req, res) => {

    const { correo, contrasena } = req.query;
    const token = jwt.sign(contrasena, 'token_contrasena');
    const user = await users.find({ 'correo': correo, 'contrasena': token }, function (err, result) {

        if (err) {

            res.send(err)
        }
        console.log(result)
        res.send(result)
    });


})

//ingresar tareas
router.put('/newTask', async (req, res) => {
    const { nombre_tarea, prioridad, fecha_vencimiento, estado, imagen } = req.body
    const { id } = req.query
    try {
        await users.findById(id, (err, newTask) => {
            newTask.tareas.push(
                {

                    nombre_tarea: nombre_tarea,
                    prioridad: prioridad,
                    fecha_vencimiento: fecha_vencimiento,
                    estado: estado,
                    imagen: imagen
                    

                }
            )
            newTask.save();
        })
        res.send('ok')
    } catch (error) {
        console.log(error)
    }


})

//Editar Tareas
router.put('/editTask', async (req, res) => {
    const {  index, id_tarea, nombre_tarea, prioridad, fecha_vencimiento, estado, imagen } = req.body
    const { id } = req.query
    const StringTareas= 'tareas.'+index
    const tarea={}
    tarea[StringTareas] = {
            "nombre_tarea": nombre_tarea,
            "prioridad": prioridad,
            "fecha_vencimiento": fecha_vencimiento,
            "estado":estado,
            "imagen": imagen
    }
    
    try {
        console.log(tarea)
         let user=  await users.update({"_id":id}, {$set:tarea})
         
        
         res.send(user)
    } catch (error) {
        console.log(error)
    }


})

//Ver todas las tareas de un usuario
router.get('/viewTasks', async (req, res) => {

    const { id } = req.query;

    const user = await users.findById(id, function (err, result) {

        if (err) {

            res.send(err)
        }
        
        res.send(result)
    });


})

//Eliminar tareas de un usuario

 router.delete('/deleteTask', async(req,res)=>{
    const {id } = req.query
    const {id_tarea} = req.body
    try {
        await users.findById(id, (err, deletedTask) => {
            deletedTask.tareas.remove({_id: id_tarea})
            deletedTask.save();
        })
        res.send('ok')
    } catch (error) {
        console.log(error)
    }
    
})
 
//ver tareas con fechas próximas
router.get('/viewTasksDate', async (req, res) => {

    const { id } = req.query;
try {
    console.log(Date())
    const user = await users.find({_id:id}, {_id:false, tareas: {$elemMatch: {fecha_vencimiento:{$lt:new Date()}}}})
    res.send(user)
} catch (error) {
    res.send(error)
}
    

})

//Marcar tarea como terminada

router.put('/taskDone', async (req, res) => {

    const {id} = req.params
    const { id_tarea, index }= req.body
    const StringTareas= 'tareas.'+index+'.estado'
    const tarea={}
    tarea[StringTareas] = true
try {

    console.log(tarea)
    const user = await users.update({"tareas._id": id_tarea},{$set:tarea})
    res.send(user)
} catch (error) {
    res.send(error)
}
    

})

//desmarcar tarea terminada
router.put('/reverseTaskDone', async (req, res) => {

    
    const { id_tarea, index }= req.body
    const StringTareas= 'tareas.'+index+'.estado'
    const tarea={}
    tarea[StringTareas] = false
try {

    
    const user = await users.update({"tareas._id": id_tarea},{$set:tarea})
    res.send(user)
} catch (error) {
    res.send(error)
}
    

})





module.exports = router;