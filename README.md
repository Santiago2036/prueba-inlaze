# Prueba tecnica para Inlaze

Esta es una prueba tecnica que se compone de backend realizado en el framework nestjs y base de datos en postgres desplegada en contenedor docker.


## Correr el proyecto:

Puedes ejecutar la aplicacion o seguir estos pasos desde la raiz del proyecto:

1 - levantar base de datos
```sh
    sudo docker-compose up -d database
```

2 - realizar migraciones de las tablas de la base de datos
```sh
    npm run migrations:generate -- nombre_migracion
    npm run migrations:run

    Las credenciales de la base de datos se encuentran en un archivo ,env;en la raiz del proyecto se encuentra un archivo .envExample donde se encuentra el ejemplo de como se llaman las variables de entorno.
```

3- levantar la aplicacion nestjs en dev:
```sh
    npm install --force
    npm run start:dev

    la aplicacion quedo documentada con swagger en la ruta : http://localhost:3000/docs  para dev.
    tambien se adjunta la coleccion del postman.
```
