# ☕ Coffee Lab

Aplicación web de e-commerce para cafetería artesanal desarrollada con React. Incluye carrito de compras, autenticación de usuarios, sistema de roles y panel de administración con Firebase.

## Funcionalidades

- **Catálogo de productos**: Visualización de cafés con imágenes, precios y favoritos.
- **Carrito de compras**: Agregar, eliminar y modificar cantidad de productos.
- **Cupones de descuento**: Códigos promocionales (COFFEE10, LAB15, BIENVENIDO20).
- **Autenticación**: Registro e inicio de sesión con Firebase Authentication.
- **Sistema de roles**: Usuarios administradores vs. usuarios estándar con permisos diferenciados.
- **Panel de administración**: CRUD completo de productos (crear, leer, actualizar, eliminar) con Firestore.
- **Rutas protegidas**: Acceso restringido a secciones administrativas según autenticación y rol.
- **Diseño responsivo**: Adaptable a dispositivos móviles con Flexbox y media queries.

## Tecnologías

- **React 19** con Vite
- **React Router v7**
- **Firebase** (Authentication + Firestore)
- **Context API** para estado global
- **ESLint** para linting

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Una cuenta de Google (para Firebase)

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/coffee-lab.git
cd coffee-lab

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
```

## Configuración de Firebase

### 1. Crear proyecto en Firebase

1. Ingresá a [Firebase Console](https://console.firebase.google.com/).
2. Hacé clic en **"Crear un proyecto"**, ingresá un nombre (ej: `coffee-lab`) y seguí los pasos.
3. Una vez creado, hacé clic en el icono **Web** (`</>`) para registrar una app.
4. Copiá las credenciales que te muestra (apiKey, authDomain, projectId, etc.).

### 2. Completar el archivo .env

Editá el archivo `.env` en la raíz del proyecto y pegá tus credenciales:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=coffee-lab-8a085.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=coffee-lab-8a085
VITE_FIREBASE_STORAGE_BUCKET=coffee-lab-8a085.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=817306850985
VITE_FIREBASE_APP_ID=1:817306850985:web:...
```

### 3. Habilitar Authentication

1. En Firebase Console, andá a **"Authentication"** → **"Sign-in method"**.
2. Hacé clic en **"Email/Password"**, activalo y guardá.

### 4. Habilitar Firestore Database

1. Andá a **"Firestore Database"** → **"Crear base de datos"**.
2. Elegí **"Modo prueba"** (para desarrollo).
3. Elegí una región (ej: `us-central1`) y confirmá.

### 5. Crear usuario administrador (opcional)

1. En **Authentication** → **"Users"**, hacé clic en **"Add user"**.
2. Ingresá email y contraseña (ej: `admin@gmail.com` / `admin1234`).
3. Andá a **Firestore Database** → **"Iniciar colección"**.
4. Nombre de la colección: `usuarios`.
5. ID del documento: el **UID** del usuario que creaste (lo ves en Authentication → Users).
6. Agregá el campo `rol` con valor `"admin"`.
7. Guardá.

Los usuarios sin documento en la colección `usuarios` tienen rol estándar y no pueden acceder al panel de administración.

## Ejecución

```bash
# Iniciar en modo desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:5173

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Verificar linting
npm run lint
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Admin/                  # Panel de administración y CRUD
│   │   ├── ConfirmModal.jsx    # Modal de confirmación para eliminar
│   │   └── ProductManager.jsx  # Gestión de productos con Firestore
│   ├── Auth/                   # Autenticación
│   │   ├── Login.jsx           # Formulario de inicio de sesión
│   │   ├── Register.jsx        # Formulario de registro
│   │   └── ProtectedRoute.jsx  # Componente de rutas protegidas
│   ├── Carrito/
│   │   └── CarritoView.jsx     # Vista del carrito con cupones
│   ├── Footer/
│   │   └── Footer.jsx          # Pie de página con equipo
│   ├── Header/
│   │   └── Header.jsx          # Navegación principal dinámica
│   ├── ItemListContainer/
│   │   ├── Item.jsx            # Tarjeta de producto individual
│   │   └── ItemListContainer.jsx  # Catálogo de productos
│   ├── Layout/
│   │   └── Layout.jsx          # Layout principal
│   ├── ProductForm/
│   │   └── ProductForm.jsx     # Formulario de productos con validaciones
│   └── Spinner/
│       └── Spinner.jsx         # Indicador de carga
├── config/
│   └── firebase.js             # Configuración e inicialización de Firebase
├── context/
│   ├── AuthContext.jsx         # Estado global de autenticación y roles
│   └── CartContext.jsx         # Estado global del carrito
├── App.jsx                     # Componente principal con rutas
├── App.css                     # Estilos globales y media queries
├── main.jsx                    # Punto de entrada
└── index.css                   # Estilos base
```

## Rutas disponibles

| Ruta          | Descripción                          | Acceso           |
|---------------|--------------------------------------|------------------|
| `/`           | Página de inicio                     | Público          |
| `/productos`  | Catálogo de productos                | Público          |
| `/carrito`    | Carrito de compras                   | Público          |
| `/login`      | Inicio de sesión                     | Público          |
| `/register`   | Registro de usuario                  | Público          |
| `/admin`      | Panel de administración de productos | Solo admin       |

## Cupones de descuento

| Código       | Descuento |
|--------------|-----------|
| COFFEE10     | 10%       |
| LAB15        | 15%       |
| BIENVENIDO20 | 20%       |

## Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso Talento Lab.
