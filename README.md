# TP Integrador - Programación III

## Integrantes

* María Fernanda Luna
* Cristian Gimenez
* Noelia Mariana Rodeiro
* David De Bueno
* Francisco Diaz
* Rita Carina Herrera

1. Clonar el repositorio:

git clone https://github.com/mferlunna/tpintegrador.git

## Descripción

Sistema de gestión de turnos médicos desarrollado como Trabajo Práctico Integrador de Programación III.

La aplicación permite administrar pacientes, médicos, especialidades, obras sociales y turnos, implementando autenticación mediante JWT y control de acceso basado en roles.

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- BcryptJS
- Swagger (OpenAPI)
- PDFKit
- dotenv
- cors


## Roles del sistema

### Médico (Rol 1)

* Iniciar sesión.
* Listar turnos propios.
* Marcar turnos como atendidos.

### Paciente (Rol 2)

* Iniciar sesión.
* Crear reservas de turnos.
* Listar turnos propios.
* Consultar especialidades.
* Consultar médicos.

### Administrador (Rol 3)

- Iniciar sesión.
- Gestionar médicos.
- Gestionar especialidades.
- Gestionar obras sociales.
- Asociar médicos con especialidades.
- Asociar médicos con obras sociales.
- Asociar pacientes con obras sociales.
- Registrar turnos.
- Obtener estadísticas de atenciones.
- Generar reportes PDF.

## Instalación

2. Instalar dependencias:

npm install


3. Configurar archivo `.env`

*.env
PORT=3000

DB_HOST=localhost
DB_DATABASE=prog3_turnos
DB_USER=prog3_turnos
DB_PASSWORD=1234

JWT_SECRET=grupo_s_prog_3_2026
JWT_EXPIRES=1d
FRONTEND_URL=http://localhost:5173

4. Importar la base de datos MySQL.

5. Ejecutar el proyecto:

npm run dev

## Usuarios de prueba

### Médico

Contraseña: `medico`

### Paciente

Contraseña: `paciente`

### Administrador

Contraseña: `admin`

## Documentación API

Swagger disponible en:


http://localhost:3000/api-docs


## Funcionalidades implementadas

- Autenticación mediante JWT.
- Control de acceso por roles.
- CRUD de médicos.
- CRUD de especialidades.
- CRUD de obras sociales.
- Gestión de pacientes.
- Gestión de turnos médicos.
- Asociación de médicos con especialidades.
- Asociación de médicos con obras sociales.
- Asociación de pacientes con obras sociales.
- Estadísticas de atenciones mediante procedimientos almacenados.
- Generación de reportes PDF.
- Documentación de API con Swagger.
- Validaciones y manejo de errores.

## Base de datos

El proyecto utiliza MySQL e implementa:

- Tablas normalizadas.
- Claves primarias y foráneas.
- Vistas.
- Procedimientos almacenados.
- Relaciones entre médicos, pacientes, obras sociales y turnos.

## Seguridad

- Contraseñas almacenadas con Bcrypt.
- Autenticación mediante JWT.
- Autorización basada en roles.
- Protección de endpoints según permisos.
