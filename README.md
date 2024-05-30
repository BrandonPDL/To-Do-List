
# To-Do List App

Esta es una aplicación de lista de tareas simple desarrollada con Laravel en el backend y React.js en el frontend.

## Requisitos

- PHP >= 7.3
- Composer
- Node.js
- MySQL

## Configuración de la base de datos

- Crea una base de datos limpia en tu servidor MySQL.
- Utiliza los siguientes datos predeterminados o ajusta según sea necesario:

```plaintext
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=root
DB_PASSWORD=1234
```

## Backend

- Genera un archivo `.env` a partir del archivo `.env.example` ejecutando el siguiente comando:

```bash
cp .env.example .env
```

- Instala las dependencias ejecutando:

```bash
composer install
```

```bash
npm install
```

- Genera una clave de aplicación única ejecutando:

```bash
php artisan key:generate
```

- Corre el servidor ejecutando:

```bash
php artisan serve
```

## Frontend

- Abre la terminal ubicada en `To-Do List/FrontEnd`.
- Ejecuta los siguientes comandos:

```bash
npm install
```

```bash
npm run dev
```

