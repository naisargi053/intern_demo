const express = require('express')
const {db } = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
const user= require('./routes/transaction')
const User_model = require('./models/User_model')
const app = express()
app.use(express.json())


const port = 5000
dotenv.config()

//middleware
const corsOption ={
  origin:['*'],
  Credential: true,
};
app.use(cors(corsOption))


app.use("/api/v1",user)
   
 

app.listen(port, () =>{
    db()
    console.log(`Listerning on port http://localhost:${port}`)

})

