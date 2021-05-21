const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const connectToDatabase = (async () => {
    try {
        await mongoose.connect('mongodb://localhost/expenseTracker', {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch {
        console.log('Cannot connect to database');
    }
})();

app.listen(3000, () => console.log('Server running on port 3000'));