const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

app.use(express.json());

/** CONFIGURACIÓN */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'app',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

/** PETICIONES */
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/** VARIABLES GLOBALES */
app.use((req, res, next) => {
    next();
});

/** PUBLIC */
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
app.use(require('./routes'));
app.use(require('./routes/authentication'));
/*app.use('/pago', require('./routes/payment'));
app.use('/contenido', require('./routes/contenido'));
app.use('/links', require('./routes/links'));
app.use('/notas', require('./routes/notas'));
app.use('/parcial', require('./routes/parcial'));
app.use('/estudiantes', require('./routes/estudiantes'));
app.use('/docentes', require('./routes/docentes'));*/

/** DEFINIDAS CLASE - PROYECTO */
app.use('/ingresar', require('./routes/login'));
app.use('/registrar', require('./routes/register'));
app.use('/pedidos', require('./routes/pedidos'));
app.use('/carrito', require('./routes/carrito'));
app.use('/productos', require('./routes/productos'));
app.use('/admin', require('./routes/admin'));

/** RUN */
app.listen(app.get('port'), () => {
    console.log(`Complied sucessfully in port ${app.get('port')}`);
});
