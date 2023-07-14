const express =require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv =require('dotenv')
const conncetDB  = require('./config/db')





// env config
dotenv.config();

// mongodb connection 
conncetDB();



//rest object
const app=express();


//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// routes
app.get('/', (req,res)=>{
    res.status(200).send(`<h1> hello this blog app</h1>`);
})



// port 
const PORT= process.env.PORT  || 8080


// listen 
app.listen(PORT , ()=>{
    console.log(` server is running on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.black);
});