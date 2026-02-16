# 🍽️ Bite&Go Admin - API REST

Una aplicación backend robusta y escalable para gestionar restaurantes, eventos gastronómicos, pedidos, recetas e inventario de suministros.

## 📋 Descripción del Proyecto

**Bite&Go Admin** es una API REST desarrollada con **Node.js**, **Express** y **MongoDB** que proporciona un sistema completo de gestión para establecimientos de comida. Cuenta con 9 módulos CRUD independientes, cada uno especializado en diferentes aspectos del negocio.

---

## 🏗️ Arquitectura y Módulos CRUD

### **1. 👥 Módulo de Usuarios** (`/bite-and-go/v1/users`)
Gestiona la información y credenciales de los usuarios del sistema.

**Funcionalidades:**
- **GET** - Listar usuarios con paginación
- **POST** - Crear nuevo usuario
- **PUT** - Actualizar datos de usuario
- **DELETE** - Desactivar usuario (eliminación lógica)

**Descripción:** Este módulo maneja el registro, autenticación y administración de perfiles de usuarios, incluyendo roles y permisos dentro del sistema.

---

### **2. 🏢 Módulo de Restaurantes** (`/bite-and-go/v1/restaurants`)
Administra la información de los restaurantes asociados a la plataforma.

**Funcionalidades:**
- **GET** - Listar restaurantes activos con paginación
- **POST** - Crear nuevo restaurante
- **PUT** - Actualizar información del restaurante
- **DELETE** - Desactivar restaurante (no se elimina físicamente)

**Descripción:** Almacena datos maestros de restaurantes como nombre, dirección, teléfono, horarios, y mantiene relaciones con mesas y eventos. Utiliza eliminación lógica para preservar la integridad histórica.

---

### **3. 🎉 Módulo de Eventos Gastronómicos** (`/bite-and-go/v1/gastronomicEvents`)
Gestiona eventos especiales, promociones y actividades gastronómicas del restaurante.

**Funcionalidades:**
- **GET** - Listar eventos con paginación y filtros
- **POST** - Crear nuevo evento gastronómico
- **PUT** - Actualizar detalles del evento
- **DELETE** - Desactivar evento

**Descripción:** Permite crear y gestionar eventos como catas, cenas temáticas, promociones especiales, vinculados a restaurantes específicos con fechas, horarios y capacidad de asistentes.

---

### **4. 🪑 Módulo de Mesas** (`/bite-and-go/v1/tables`)
Controla la información de las mesas disponibles en cada restaurante.

**Funcionalidades:**
- **GET** - Listar mesas con estado y disponibilidad
- **POST** - Registrar nueva mesa
- **PUT** - Actualizar información de mesa (número, capacidad, ubicación)
- **DELETE** - Desactivar mesa

**Descripción:** Registra todas las mesas de los restaurantes, incluyendo número de mesa, capacidad de personas, zona del local y estado actual (disponible/ocupada). Es fundamental para la gestión de reservas y órdenes.

---

### **5. 🍽️ Módulo de Productos** (`/bite-and-go/v1/products`)
Catálogo completo de productos/platos ofrecidos por los restaurantes.

**Funcionalidades:**
- **GET** - Listar productos con paginación, filtros por categoría y precio
- **POST** - Agregar nuevo producto/plato
- **PUT** - Actualizar información de producto (nombre, descripción, precio, imagen)
- **DELETE** - Desactivar producto

**Descripción:** Almacena el catálogo de comidas y bebidas con detalles como descripción, precio, calorías, ingredientes, disponibilidad y categoría (entrada, plato principal, postre, bebida, etc.).

---

### **6. 📦 Módulo de Inventario de Suministros** (`/bite-and-go/v1/suppliesInventory`)
Gestiona el inventario y stock de ingredientes y suministros.

**Funcionalidades:**
- **GET** - Consultar niveles de stock con alertas de bajo inventario
- **POST** - Registrar nuevos suministros
- **PUT** - Actualizar cantidades y valores
- **DELETE** - Desactivar suministro del inventario

**Descripción:** Controla el stock de ingredientes, empaques y suministros. Monitorea niveles mínimos, permite registrar entradas y salidas, y facilita la gestión de proveedores y costos de producción.

---

### **7. 🛒 Módulo de Órdenes** (`/bite-and-go/v1/orders`)
Gestiona todas las órdenes/pedidos realizados en los restaurantes.

**Funcionalidades:**
- **GET** - Listar órdenes con filtros por estado, fecha y restaurante
- **POST** - Crear nueva orden
- **PUT** - Actualizar estado de orden (pendiente, preparando, lista, entregada)
- **DELETE** - Cancelar orden

**Descripción:** Registra cada pedido realizado por los clientes, incluyendo mesa, cliente, fecha/hora, estado de preparación, total a pagar y notas especiales. Es el centro de operaciones de ventas.

---

### **8. 📝 Módulo de Items/Detalles de Órdenes** (`/bite-and-go/v1/items`)
Gestiona los items individuales dentro de cada orden.

**Funcionalidades:**
- **GET** - Listar items de una orden
- **POST** - Agregar producto a una orden
- **PUT** - Modificar cantidad o especificaciones del item
- **DELETE** - Remover item de la orden

**Descripción:** Almacena los detalles de cada artículo en una orden: producto, cantidad, precio unitario, observaciones especiales (sin cebolla, poco picante, etc.). Vincula directamente órdenes con productos.

---

### **9. 🍳 Módulo de Recetas** (`/bite-and-go/v1/recipes`)
Administra las recetas y procedimientos de preparación de los platos.

**Funcionalidades:**
- **GET** - Listar recetas disponibles
- **POST** - Crear nueva receta
- **PUT** - Actualizar ingredientes y pasos de preparación
- **DELETE** - Desactivar receta

**Descripción:** Vincula productos (platos) con sus ingredientes y suministros, incluyendo cantidades necesarias, pasos de preparación, tiempo de cocción, dificultad y personal encargado. Crucial para la gestión de costos y control de calidad.


### **10. 📅 Módulo de Reservas** (`/bite-and-go/v1/reservations`)
Gestiona las reservas de mesas realizadas por los clientes en los restaurantes.

**Funcionalidades:**
- **GET** - Listar reservas con filtros por fecha, estado, cliente o restaurante
- **POST** - Crear nueva reserva
- **PUT** - Actualizar datos de la reserva (fecha, hora, cantidad de personas, estado)
- **DELETE** - Cancelar reserva

**Descripción:** Permite a los clientes reservar mesas en restaurantes específicos indicando fecha, hora y número de personas. El módulo valida disponibilidad según capacidad y estado de las mesas, evita sobre reservas y mantiene estados como: pendiente, confirmada, cancelada o completada.

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|-----------|
| **Node.js** | Runtime de JavaScript |
| **Express.js** | Framework web y enrutamiento |
| **MongoDB** | Base de datos NoSQL |
| **Mongoose** | ODM para MongoDB |
| **CORS** | Manejo de solicitudes cross-origin |
| **Helmet** | Seguridad de headers HTTP |
| **Morgan** | Logging de solicitudes HTTP |

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js v14 o superior
- MongoDB instalado o cuenta en MongoDB Atlas
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/marcss-bnajera/Bite-GO.git
cd Bite-GO

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear archivo .env en la raíz del proyecto
cp .env.example .env

# 4. Variables necesarias en .env
PORT=3001
URL_MONGODB=mongodb+srv://usuario:contraseña@cluster.mongodb.net/bite-go

# 5. Iniciar el servidor
npm start
