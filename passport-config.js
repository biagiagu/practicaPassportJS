const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//funcion de configuracion de estratefia de autenticacion local
function initialize(passport, getUserByEmail, getUserById) {

	const authenticateUser = async (email, password, done) => {

		const user = getUserByEmail(email); //retorna Busca en la "BD" el usuario con ese mail.

		if (user == null) {
			return done(null, false, {
				message: `${email} no registrado`
			});
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				console.log(`usuario desde Passport-config: ${user.name, user.email}`);
				return done(null, user)
			} else {
				return done(null, false, {
					message: 'Password incorrecto'
				})
			}
		} catch (error) {
			return done(error);
		}
	}

	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		authenticateUser))

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id));

	})

}

// funciones midleware para verificar si existe sesion creada
function checkAuthenticate (request, response, next){
	if (request.isAuthenticated()){
		return next()
	}else{
		response.redirect("/login");
	}
}

function checkNotAuthenticated (request, response, next){
	if (request.isAuthenticated()){
		response.redirect("/");
	}else{
		return next();
	}
}


module.exports = {
	initialize: initialize,
	checkAuthenticate: checkAuthenticate,
	checkNotAuthenticated: checkNotAuthenticated
};