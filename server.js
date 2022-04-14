require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require("path")
const PORT = process.env.PORT
const uri = process.env.MONGODB_URI


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.connect( 
    uri,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (error) => {
        if (error) throw error
        console.log('Connected to database')
    }    
)


app.use('/bands', require('./routes/bandRouter.js'))
app.use(express.static(path.join(__dirname, "client", "build")))


app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

app.set('etag', false)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
