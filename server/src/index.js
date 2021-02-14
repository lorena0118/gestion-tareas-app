require('dotenv').config()
const morgan = require('morgan');
const express = require('express');
const app = express()
const cors = require('cors')

//import database connecction. 
require('./bd/bd')

//import routes
const routes = require('./routes/routes')


//settings
app.set('port', process.env.PORT || 5002)

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

//routes
app.use('/', routes)



//starting server
app.listen(app.get('port'), ()=>{
    console.log(`Server started on port ${app.get('port')}`)
})