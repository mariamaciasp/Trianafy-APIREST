# Trianafy-APIREST
PROYECTO DE DESARROLLO DE UNA API REST CON NODE, EXPRESS, MONGO Y MONGOOSE


La API servirá a una aplicación llamada Trianafy, que gestiona listas de reproducción de música.

Para importar los datos de la base de datos, en la ruta src tenemos la carpeta database en ella se encuentran tres ficheros json, cada uno correspondiente a una colección de la bbdd. Por lo que importando esos ficheros en mongodb en la bbdd de trianafy tendremos una base de datos con tres colecciones (users, songs, play_lists) lista para usar con una gran cantidad de datos.


En la raiz del repositorio crear un fichero .env con los siguientes datos:


- PORT = 3000

- JWT_SECRET=esteEsElSecretoMásSecretoDeTodosLosSecretos

- BCRYPT_ROUNDS=12

- JWT_LIFETIME=1d

- JWT_ALGORITHM=HS256

- DB_URI=mongodb://localhost/trianafy


Los usuarios ya registrados los podemos encontrar en la colección users o en la carpeta database nombrada anteriormente la contraseña para todos ellos es "12345678".

El usuario que ha creado todas las playlists es:

{
"username": "maria",
"password": "12345678"
}

Por lo que como indica en los requisitos del proyecto, este será el único que podrá gestionar las playlists existentes.


