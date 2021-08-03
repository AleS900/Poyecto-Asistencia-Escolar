const bodyparser = require('body-parser')
const express = require('express');
const dotenv = require('dotenv');
const morgan =  require ('morgan')
const path = require('path');
const app = express();


dotenv.config({path:'config.env'})

const PORT = process.env.PORT||8080

// log request
app.use(morgan('tiny'));

//parse request
app.use(bodyparser.urlencoded({extend:true}))

//set view engine
app.set("view engine", "ejs")

//load request
app.use('/css', express.static(path.resolve(__dirname,"assets/ccs")))
app.use('/pics', express.static(path.resolve(__dirname,"assets/pics")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

app.get('/',(req,res)=>{
    res.render("index");
})

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});