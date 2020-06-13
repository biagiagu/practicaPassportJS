// cargamos las variables de proceso de ambiente .env
if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

//Cargamos Dependencias
const express = require('express'); //
const app = express();
const passport = require('passport'); //incluimos la libreria
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');

//llamamos al controlador
var controller = require('./controller/controller');
const { checkAuthenticate } = require('./passport-config');

//inicializamos passport


//Configuracion del Ambiente
initializePassport.initialize (passport, controller.getUserByEmail, controller.getUserById);
app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'));

//Definicion de Rutas
app.get('/', initializePassport.checkAuthenticate, controller.inicio);

app.get('/login', initializePassport.checkNotAuthenticated ,controller.login);
app.post('/login', initializePassport.checkNotAuthenticated, passport.authenticate('local', {
	//aca le pasamos una lista de opciones para manejar los estados del logueo
	successRedirect:'/',
	failureRedirect:'login',
	failureFlash: true
}))

app.get('/register', initializePassport.checkNotAuthenticated ,controller.register);
app.post('/register', initializePassport.checkNotAuthenticated, controller.registerUser);

app.delete('/logout', initializePassport.checkAuthenticate, controller.logout);



port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(process.env.PORT);
	console.log(`Server arriba y atento en el puerto ${port}`);

}); 