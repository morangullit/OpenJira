# Next.js OpenJira App
Para correr localmente, se necesita la base de datos
````
docker-compose up -d
`````


* El -d, significa __detached__


* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
````


## Configurar las varaiables de enterno
Renombrar el archivo __.env.template__   a   __.env__


* Reconstruir los mudulos de Node y levantar el proyecto
````
yarn install
yarn dev
````


## Llenar la base de datos con información de prueba

Llamara:
```http://localhost:3000/api/seed```
