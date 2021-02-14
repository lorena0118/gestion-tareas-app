require('dotenv').config()
const mongoose= require('mongoose');


const db_connection= mongoose.connect(
    'mongodb+srv://lorena:2208urmylove@cluster0.dtyyw.mongodb.net/gestion-tareas?retryWrites=true&w=majority',{
        useNerUrlParser: true
    }
).then(db => console.log('Database connected')

).catch(err => console.log(err))

module.exports=db_connection;