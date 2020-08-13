const express = require('express')
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./Routes/index');

const connectMongoDB = require('./Helpers/dbConnection');

const app = express();

// Load env vars
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}

// View engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.set('layout', 'Layouts/layout');

app.use(expressLayouts);

// Connect DB
connectMongoDB(process.env.MONGO_URL);

// Static files
app.use(express.static('Public'));

app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));