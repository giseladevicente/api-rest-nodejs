# API REST de Productos

## Descripción

Proyecto Final de Talento Tech: API REST para gestión de productos desarrollada con **Node.js**, **Express**, **Firebase Firestore** y autenticación con **JWT**.

## Índice

- [Instalación](#instalación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Endpoints de la API](#endpoints)
  - [Obtener todos los productos](#listar-todos-los-productos)
  - [Obtener producto por ID](#obtener-producto-por-id)
  - [Autenticación](#autenticación)
  - [Crear un producto](#crear-un-producto)
  - [Actualizar un producto](#actualizar-un-producto)
  - [Eliminar un producto](#eliminar-un-producto)
- [Códigos de estado](#códigos-de-estado)
- [Vercel Deployment](#vercel-deployment)



### Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
# Copiar el archivo de ejemplo y completar los datos requeridos
cp .env-example .env
```

Luego editar el archivo `.env` con los valores correspondientes para tu entorno.

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

## Documentación de la API

### Estructura del proyecto

```
src/
├── controllers/
│   └── authController.js
│   └── productsController.js
├── db/
│   └── firebase.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   └── Product.js
└── routes/
    └── authRouter.js
    └── productsRouter.js
```
### Tecnologías utilizadas

- Node.js
- Express.js
- ES6 Modules
- Firebase (Firestore)
- JWT (jsonwebtoken)
- CORS
- dotenv
- Postman: Para probar los endpoints con token y envío de body

### Endpoints

| Método | Ruta               | Descripción               |
| ------ | ------------------ | ------------------------- |
| GET    | /api               | Mensaje de bienvenida     |
| GET    | /api/products      | Lista todos los productos |
| GET    | /api/products/\:id | Muestra un producto       |
| POST   | /api/products      | Crea un producto 🔐       |
| PUT    | /api/products/\:id | Actualiza un producto 🔐  |
| DELETE | /api/products/\:id | Elimina un producto 🔐    |
| POST   | /api/auth/login    | Login, devuelve token     |


### Listar todos los productos

- **GET** `/api/products`
- **Descripción:** Devuelve la lista con todos los productos almacenados.
- **Respuesta exitosa (200 OK):**

```json
[
    {
        "id": "K4Ef2a7AY98HyDJbIV0S",
        "price": 3000,
        "name": "Cortina de baño",
        "categories": [
            "bazar",
            "baño"
        ],
        "description": "Cortina resistente al agua, color azul"
    },
    {
        "id": "StFlsniAslS563oeAQDe",
        "name": "Vela aromática",
        "categories": [
            "bazar",
            "decoración"
        ],
        "description": "Vela con aroma a lavanda, duración 40h",
        "price": 1000
    },
    {
        "id": "tGfzXvHpgBKSfGvJ76eF",
        "categories": [
            "bazar",
            "vajilla"
        ],
        "price": 5000,
        "description": "Set de 6 platos de cerámica blanca",
        "name": "Juego de platos"
    }
]
```

- **Error: URL incorrecta(404 Not Found):**
    - Ejemplo: /api/producs
    - Respuesta:
```json
{
    "error": "Not Found"
}
```


### Obtener producto por ID

- **GET** `/api/products/:id`
- **Descripción:** Devuelve un producto específico por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto.
- **Ejemplo de uso:** `api/products/tGfzXvHpgBKSfGvJ76eF`
- **Respuesta exitosa (200 OK):**

```json
{
    "id": "tGfzXvHpgBKSfGvJ76eF",
    "description": "Set de 6 platos de cerámica blanca",
    "price": 5000,
    "categories": [
        "bazar",
        "vajilla"
    ],
    "name": "Juego de platos"
}
```
#### Respuesta de Error
- **Error ID inexistente (404 Not Found):**
    - Ejemplo: /api/products/3
    - Respuesta:
```json
{
    "error": "Producto no encontrado"
}
```
### **Autenticación**

Las rutas POST, PUT y DELETE requieren autenticación mediante JWT (JSON Web Token). Para acceder a ellas, primero se debe iniciar sesión y obtener un token válido.

### Iniciar sesión (Login)
- **POST** `/api/auth/login`
- **Descripción:** Devuelve un token JWT si las credenciales son válidas.


### Crear un producto

- **POST** `/api/products`
- **Descripción:** Crea un nuevo producto en la base de datos.
- **Autenticación**: Requiere token JWT en el header `Authorization: Bearer <token>`
- **Campos obligatorios en el body**:
    - `name` (string)
    - `price` (number)
    - `categories` (array de strings)

- **Ejemplo de solicitud - Body (JSON):**
  
```json
{
    "name": "Producto Nuevo con método POST",
    "description": "producto creado con post",
    "price": 500,
    "categories": [
        "categoria 1",
        "categoria 2"
    ]
}
```

- **Respuesta exitosa (201 Created):**

```json
{
    "id": "iUgJPGRUx0K690GbgpcU",
    "price": 500,
    "categories": [
        "categoria 1",
        "categoria 2"
    ],
    "description": "producto creado con post",
    "name": "Producto Nuevo con método POST"
}
```

#### Respuestas de Error:

- **Sin token o token inválido (401 Unauthorized)**
```json
Unauthorized
```

- **Body vacío o sin datos (500 Internal Server Error):**

```json
{
    "error": "Error al crear el producto"
}
```

- **Falta un campo obligatorio (400 Bad Request):**

```json
{
    "error": "Faltan campos obligatorios (name, price, categories)"
}
```



### Actualizar un producto

- **PUT** `/api/products/:id`
- **Descripción:** Actualiza los datos de un producto existente por su ID.
- **Autenticación**: Requiere token JWT en el header `Authorization: Bearer <token>`
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Ejemplo de solicitud:** `api/products/iUgJPGRUx0K690GbgpcU`

- **Body (JSON):** Se puede enviar uno o varios campos para modificar.

- **Ejemplo de solicitud:**

```json
{ "name": "Producto Actualizado", "price": 1500 }

```

- **Respuesta exitosa (200 OK):**

```json
{
    "id": "iUgJPGRUx0K690GbgpcU",
    "price": 1500,
    "categories": [
        "categoria 1",
        "categoria 2"
    ],
    "description": "producto creado con post",
    "name": "Producto Actualizado"
}
```

#### Respuestas de error:

- **Sin token o token inválido (401 Unauthorized)**
```json
Unauthorized
```

- **Producto inexistente (404 Not Found):**
```json
{
    "error": "Producto no encontrado"
}
```

- **Body vacío o sin datos (500 Internal Server Error):**
```json
{
    "error": "Error al actualizar el producto"
}
```


### Eliminar un producto

- **DELETE** `/api/products/:id`
- **Descripción:** Elimina un producto existente por su ID.
- Autenticación: Requiere token JWT en el header:
`Authorization: Bearer <token>`
- **Parámetros:**
  - `id` (path, requerido): ID del producto a eliminar.
- **Ejemplo de solicitud:** `api/products/iUgJPGRUx0K690GbgpcU`

- **Respuesta exitosa (200 OK):**
```json
{
    "message": "Producto eliminado correctamente"
}
```

#### Respuestas de error:

- **Sin token o token inválido (401 Unauthorized)**
```json
Unauthorized
```

- **ID inexistente (404 Not Found):**
```json
{
    "error": "Producto no encontrado"
}
```

### Códigos de estado

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado
- `400` - Bad Request: Datos de entrada inválidos
- `401` - Unauthorized: Token inválido o ausente
- `403` - Forbidden: Acceso denegado
- `404` - Not Found: Recurso no encontrado
- `500` - Internal Server Error

### Vercel Deployment:
[Vercel Deployment](api-rest-nodejs-nu.vercel.app)












