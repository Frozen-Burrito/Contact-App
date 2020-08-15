const express = require('express')
const expressLayouts = require('express-ejs-layouts');

const methodOverride = require('method-override');

const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./Routes/index');
const contactRouter = require('./Routes/contacts');
const userRouter = require('./Routes/users');

const connectMongoDB = require('./Helpers/dbConnection');
const passportStrategy = require('./Helpers/passportStrategy');

const app = express();

// Load env vars
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}

passportStrategy(passport);

// View engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.set('layout', 'Layouts/layout');

app.use(expressLayouts);

app.use(methodOverride('_method'));

// Connect DB
connectMongoDB(process.env.MONGO_URL);

// Static files
app.use(express.static('Public'));

app.use(express.urlencoded({ extended: false }));

// Auth
app.use(session({
    secret: 'Dogs are great',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/contacts', contactRouter);
app.use('/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));