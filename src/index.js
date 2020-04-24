const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const helpers = require('./lib/helpers/helper')
const cors = require('cors'); 
const app = express();
require('express-group-routes');
const router = express.Router()

/** MIDDLEWARE */
app.use(express.json());
app.use(morgan('dev'));
/** CORS - PETICIONES*/
app.use(express.urlencoded({extended:false}));
app.use(cors());
/** SESSION */
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'my_secret_jeff',
    cookie: { 
        expires: new Date(Date.now() + 3600000)
    }
}));
app.use(flash());
/** CONFIGURACIÓN */
app.set('port', process.env.PORT || 3000); /** PUERTO */
app.set('views', path.join(__dirname, 'views')); /** ARCHIVO DE VISTAS */
/** CONFIG HBS */
app.engine('.hbs', hbs({
    defaultLayout: 'app',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
/** VISTAS CON EXTENSION HBS */
app.set('view engine', '.hbs');

/** VARIABLES GLOBALES */
app.use((req, res, next) => {
    app.locals.token = req.flash('token')
    app.locals.user = req.flash('user')
    next();
});

/** CARPETA PUBLICA */
app.use(express.static(path.join(__dirname, 'public')));

/** RUTAS */
app.use(require('./routes'));
app.use('/login', require('./routes/login'));
app.use('/registrar', require('./routes/register'));

/** DEFINIDAS CLASE - PROYECTO */
app.use('/ingresar', require('./routes/login'));
app.use('/pedidos', require('./routes/pedidos'));
app.use('/carrito', require('./routes/carrito'));
app.use('/productos', require('./routes/productos'));
app.use('/admin', require('./routes/admin'));

/** API ROUTES */
app.use('/api/register', require('./routes/api/register'));
app.use('/api/auth', require('./routes/api/authentication'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/productos', require('./routes/api/productos'));

/** CORRIENDO EL SERVER */
app.listen(app.get('port'), () => {
    console.log(`Complied sucessfully in port ${app.get('port')}`);
});
