# Ejercicio de uso de Passport para autenticar usuarios

## GUIA DE IMPLEMENTACION

Three pieces need to be configured to use Passport for authentication:

###	1. Authentication strategies
###	2. Application middleware
###	3. Sessions (optional)


1. Instalar las librerias passport, passport-local, express-session y express-flash

	`Npm i passport passport-local express-session express-flash`

2. Cargamos todas las dependencias y configuraciones de nuestro ambiente
3. Configuramos la estrategia de Autenticacion
	a. Creamos el archivo passport-config.js en el directorio raiz de la app (en este archivo incluiremos toda la configuracion necesaria de passport)
	b. Al iniciar passport es necesario indicar a passport cuales son los campos de usernameField y password
	c. También debemos pasarle la función que utilizara para autenticar los usuarios. (en nuestro caso authenticateUser que la definimos en el mismo archivo passport-config.js
	d. `serializeUser` y `deserializeUser`
4. Definimos los middleware necesarios
	a. Crear las funciones de `checkAuthenticated` y `checkNotAuthenticated`
	b. Crear las funciones para logout y cierre de sesion:
		i. Instalar dependencia method-override --> permite usar el metodo delete del HTTP
	
