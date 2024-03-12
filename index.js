const express = require('express')
const {db } = require('./config/db')
const dotenv = require('dotenv')
const app = express()
const port = 5000
dotenv.config()

app.get('/',(req,res) => {
    res.send("Hello nidhi")
})

app.listen(port, () =>{
    db()
    console.log(`we are listerning on port ${port}`)
})