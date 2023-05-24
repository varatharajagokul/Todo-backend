const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ('cors');
const router = require("./Routes/Todo");
const authroute = require ("./Routes/Auth")
const { param } = require('express/lib/request');

const PORT = process.env.PORT || 8100;

const app = express();

app.use(express.json())
app.use(cors())

app.use('/',router)
app.use('/',authroute)

const URI = "mongodb+srv://varatharajagokul2912:varatharajagokul@cluster0.dvlacjj.mongodb.net/"

mongoose.connect(URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running in ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})