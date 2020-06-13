
//#### Modelo para emular la BD #####
const bcrypt = require('bcrypt');

const users = [{
	id: "1591913823536",
	name:"Agustin",
	email:"q@q",
	password:"$2b$10$rJDRw0lksSJ2wUT5YifvUemlD96slvCYdoHk4vnmWyIWkE4p5ubr2"
}];
function addUser(user) {
	console.log(user);
	users.push(user);
}

//########Controlador##########

function inicio(request, response) {
	console.log(`Pase por inicio y encontre: ${request.user.email}`)
	console.log(`Pase por inicio y encontre: ${request.user.name}`)
	console.log(`Pase por inicio y encontre: ${Object.values(request.user)}`)
	//response.render('index.ejs', {name: request.user.name});
	response.render('index.ejs', {name: request.user.name});
}

function login(request, response) {
	response.render('login.ejs');
}

function register(request, response) {
	name = request.params.name;
	console.log(`Pase por registro y encontre: ${name}`)
	response.render('register.ejs', {name: name});
}

async function registerUser(request, response) {
	try {
		const hashedPassword = await bcrypt.hash(request.body.password, 10);
		let user = {
			id: Date.now().toString(),
			name: request.body.name,
			email: request.body.email,
			password: hashedPassword,
		};
		addUser(user);
		console.log(users);
		response.redirect('/login');
	} catch {
		response.redirect('/register');
	}
}

function getUserByEmail(email) {
	return users.find( (user) => user.email === email);
}

function getUserById(id){
	return users.find( (user) => user.id === id);
}

function logout(request, response){
	request.logOut();
	response.redirect("/login");
}

module.exports = {
	inicio: inicio,
	login: login,
	register: register,
	registerUser: registerUser,
	getUserByEmail: getUserByEmail,
	getUserById: getUserById,
	logout: logout
};
