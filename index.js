const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProductRouter = require('./routers/product')
const TaskRouter = require('./routers/task')
const path = require('path')
require('dotenv').config()

const server = express()
server.use(express.json())
server.use(cors())

server.use('/api/products', ProductRouter)
server.use('/api/tasks', TaskRouter)
server.use(express.static(path.join(__dirname, process.env.PUBLICDIR)))
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, process.env.PUBLICDIR, 'index.html'));
});

async function connectDB() {
    // try {
    await mongoose.connect('mongodb+srv://rishi:rishi6823@cluster0.lbibhkq.mongodb.net/nodejs')
    //     server.listen(8080, (req, res) => {
    //         console.log('server started')
    //     })
    //     console.log('database connected')
    //     console.log(process.env.PUBLICDIR)
    // } catch (error) {
    //     console.log(error)
    // }
}

connectDB()
    .then((response) => {
        console.log('database connected',response)
        server.listen(8080, (req, res) => {
            console.log('server started')
        })
    })
    .catch((error) => { console.log(error) })
