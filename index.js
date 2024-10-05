const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductRouter = require('./routers/product');
const TaskRouter = require('./routers/task');
const path = require('path');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());

// Serve APIs
server.use('/api/products', ProductRouter);
server.use('/api/tasks', TaskRouter);

// Serve static assets
server.use(express.static(path.resolve(__dirname, process.env.PUBLICDIR))); // For serving JS, CSS files

// Catch-all route for serving index.html for other routes
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, process.env.PUBLICDIR, '../index.html'));  // Adjust path to reach the correct index.html
});

// MongoDB connection
async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
}

connectDB()
    .then(() => {
        server.listen(8080, () => {
            console.log('Server started on port 8080');
        });
    })
    .catch((error) => {
        console.log(error);
    });
