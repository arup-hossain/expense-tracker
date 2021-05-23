const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const errorHandler = require('./middlewares/errorHandler');
const authenticate = require('./middlewares/authenticate');

const transactionsRoute = require('./routes/transactions');
const authRoute = require('./routes/auth');
const categoriesRoute = require('./routes/categories');

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

app.use('/api/auth', authRoute);
app.use(authenticate);

app.use('/api/transactions', transactionsRoute);
app.use('/api/categories', categoriesRoute);

app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));