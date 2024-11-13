const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 6001;
const conactRouter = require('./routes/auth')

app.use(express.json())

require("./db/db").connect();

app.use(cors());

app.use("/api/contact",conactRouter)

app.get('/',(req,res)=>  {
    return res.json({
        success:true,
        message:"Your Server is up and running"
    })
})

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})