# 🍽️ Bite&Go — Monorepo

**Plataforma de gestión gastronómica** compuesta por 6 microservicios y 3 clientes frontend. Permite administrar restaurantes, menús, pedidos, reservas, inventario y más, tanto desde web como desde app móvil.

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)
![.NET](https://img.shields.io/badge/.NET-8-512BD4?logo=dotnet)
![React](https://img.shields.io/badge/React-18/19-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-56-000020?logo=expo)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

---

## 📦 Servicios

| # | Servicio | Tecnología | Puerto | BD | Propósito |
|---|----------|-----------|:------:|:--:|-----------|
| 1 | **auth-service-bite-go** | .NET 8 / C# | `3000` | PostgreSQL | Autenticación, JWT, registro, verificación email, recuperación de contraseña |
| 2 | **Bite-go-user** | Node.js / Express 5 | `3001` | MongoDB | API pública: restaurantes, menú, pedidos, reservas, reseñas |
| 3 | **Bite-go-admin** | Node.js / Express 5 | `3002` | MongoDB | API administrativa: CRUD restaurantes, productos, inventario, usuarios staff |
| 4 | **client-user-bite-go** | React 19 / Vite 8 | `5173` | — | Frontend web para clientes |
| 5 | **client-admin-bite-go** | React 18 / Vite 8 | `5174` | — | Frontend web para administradores |
| 6 | **client-user-mobile-bite-go** | React Native / Expo 56 | — | — | App mobile para clientes (Android/iOS) |

---

## 🏗️ Arquitectura del Monorepo

```
Bite-GO/
│
├── auth-service-bite-go/          # 🔐 .NET 8 — Autenticación
│   └── src/
│       ├── AuthService.Api/           # Endpoints REST, Swagger
│       ├── AuthService.Application/   # JWT, Argon2, Email (Brevo), Cloudinary
│       ├── AuthService.Domain/        # Entidades, Enums, Interfaces
│       └── AuthService.Persistence/   # EF Core, Migraciones, Seed Data
│
├── Bite-go-user/                  # 🧑‍🍳 Node.js — API Clientes
│   ├── configs/                       # Express, CORS, Helmet, MongoDB
│   ├── middlewares/                   # JWT validation, roles, validators
│   ├── index.js / Dockerfile          # Entry point
│   └── src/
│       ├── users/                     # Perfil, favoritos, direcciones
│       ├── restaurants/               # Información pública de restaurantes
│       ├── orders/                    # Pedidos del cliente
│       ├── reservations/              # Reservas de mesas
│       ├── products/                  # Menú y productos
│       ├── categories/                # Categorías de productos
│       ├── coupons/                   # Validación de cupones
│       ├── notifications/             # Notificaciones push
│       ├── reviewsRatings/            # Reseñas y calificaciones
│       ├── items/                     # Items dentro de pedidos
│       └── gastronomicEvents/         # Eventos del restaurante
│
├── Bite-go-admin/                 # 👑 Node.js — API Administración
│   ├── configs/                       # Express, CORS, Helmet, MongoDB
│   ├── middlewares/                   # JWT, roles, 19 validadores
│   ├── scripts/                       # migrate-sucursales.js
│   ├── index.js / Dockerfile
│   └── src/
│       ├── users/                     # CRUD usuarios staff
│       ├── restaurants/               # CRUD restaurantes + sucursales + mesas
│       ├── orders/                    # CRUD pedidos
│       ├── reservations/              # CRUD reservas + check-in
│       ├── products/                  # CRUD productos + recetas
│       ├── categories/                # CRUD categorías
│       ├── suppliesInventory/         # Inventario de suministros
│       ├── items/                     # Items de pedidos
│       ├── recipes/                   # Recetas (ingredientes)
│       ├── tables/                    # Gestión de mesas
│       ├── gastronomicEvents/         # Eventos gastronómicos
│       └── inter-service/             # Endpoints internos (stock)
│
├── client-user-bite-go/           # 🌐 React 19 — Frontend Cliente
│   └── src/
│       ├── features/                  # auth, restaurants, orders, reservations, profile, reviews...
│       ├── shared/                    # API client, hooks, utils
│       └── app/                       # App root, routing (React Router 7)
│
├── client-admin-bite-go/          # ⚙️ React 18 — Frontend Admin
│   └── src/
│       ├── features/                  # restaurants, orders, reservations, products, inventory...
│       ├── shared/                    # API client, Zustand stores, UI components
│       └── app/                       # App root, layouts, routing
│
├── client-user-mobile-bite-go/    # 📱 Expo / React Native — App Cliente
│   └── src/
│       ├── features/                  # auth, restaurants, orders, reservations, profile...
│       ├── navigation/                # AuthStack, MainTabs, AppNavigator
│       └── shared/                    # API client, store, hooks, providers
│
├── .env                            # Variables compartidas (JWT, DBs)
├── .env.example                    # Template con documentación
├── docker-compose.yml              # Orquestación Docker completa
└── .gitignore                      # Reglas globales
```

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Auth Service** | .NET 8, EF Core, Npgsql, Argon2, MailKit/Brevo, Cloudinary |
| **APIs REST** | Node.js 18+, Express 5, Mongoose 9, express-validator |
| **Bases de datos** | MongoDB 7 (principal), PostgreSQL 16 (auth) |
| **Frontend Web** | React 18/19, Vite 8, Tailwind CSS 4, Zustand 5, React Router 7, react-hook-form, react-hot-toast |
| **App Mobile** | React Native 0.85, Expo 56, NativeWind 4, React Navigation 7, Zustand |
| **Infraestructura** | Docker Compose, Cloudinary (imágenes), Brevo (emails) |
| **Autenticación** | JWT HS256 cross-service, claims expandidos |

---

## 🔑 JWT Compartido

El `auth-service` emite tokens JWT que los servicios Node consumen. Las variables deben ser **idénticas** en los 3 servicios:

| Variable | .env raíz | Propósito |
|----------|-----------|-----------|
| `JWT_SECRET` | ✅ | Firma HMAC-SHA256 |
| `JWT_ISSUER` | ✅ | `"BiteGoAuthService"` |
| `JWT_AUDIENCE` | ✅ | `"BiteGoServices"` |

### Claims del JWT

```json
{
  "sub": "usr_abc123",
  "role": "Admin_Restaurante",
  "jti": "guid-unico",
  "iat": 1700000000,
  "exp": 1700003600,
  "email": "admin@restaurante.com",
  "email_verified": "true",
  "name": "Juan",
  "surname": "Pérez",
  "username": "juanp"
}
```

> **⚠️ Importante:** El `sub` es un **string** (`usr_xxx`), NO un ObjectId de MongoDB. Los modelos de user-service y admin-service usan `auth_id` para este campo.

---

## 🚀 Inicio Rápido (Docker)

### Requisitos

- Docker Desktop 24+ / Docker Engine
- Docker Compose v2
- Git con `--recurse-submodules`

### Pasos

```bash
# 1. Clonar con submódulos
git clone --recurse-submodules https://github.com/marcss-bnajera/Bite-GO.git
cd Bite-GO

# 2. Variables compartidas (JWT, bases de datos)
cp .env.example .env
#    Editar JWT_SECRET si es necesario
#    Si cambias el secret, los tokens existentes dejarán de validar

# 3. Secretos del auth-service (Brevo SMTP + Cloudinary)
cp auth-service-bite-go/.env.example auth-service-bite-go/.env
#    Editar credenciales Brevo (ApiKey) y Cloudinary

# 4. Levantar todo
docker compose up --build
```

### Servicios que levanta

| Servicio | Puerto | Depende de | Tiempo inicio |
|----------|:------:|------------|:------------:|
| `mongodb` | `27017` | — | ~5s |
| `auth-postgres` | `5432` | — | ~10s (healthcheck) |
| `auth-service` | `3000` | PostgreSQL | ~30s |
| `user-service` | `3001` | MongoDB, auth | ~10s |
| `admin-service` | `3002` | MongoDB, auth | ~10s |
| `client-admin` | `5173` | auth, user, admin | ~15s |

### Servicios que NO están en Docker

```bash
# Frontend web cliente (puerto 5174)
cd client-user-bite-go
npm install
npm run dev

# App mobile
cd client-user-mobile-bite-go
npm install
npx expo start
```

---

## ⚙️ Variables de Entorno

### `.env` raíz (compartido)

```bash
# --- JWT (DEBEN ser idénticos en auth, user y admin) ---
JWT_SECRET=BiteAndGoSuperSecretKey_ChangeMeInProduction_0123456789ABCDEFabcdef==!
JWT_ISSUER=BiteGoAuthService
JWT_AUDIENCE=BiteGoServices

# --- URLs internas ---
AUTH_SERVICE_URL=http://auth-service:3000
FRONTEND_URL=http://localhost:5173

# --- CORS ---
ALLOWED_ORIGIN=http://localhost:5173,http://localhost:5174

# --- Brevo (emails) ---
BREVO_API_KEY=xkeysib-tu_api_key_aqui

# --- PostgreSQL auth-service ---
AUTH_DB_USER=bitego
AUTH_DB_PASSWORD=bitego
AUTH_DB_NAME=bitego_auth_db
```

### `auth-service-bite-go/.env` (secretos propios)

```bash
SmtpSettings__Host=smtp-relay.brevo.com
SmtpSettings__Port=587
SmtpSettings__Username=<tu-email-smtp>
SmtpSettings__Password=<tu-smtp-password>
SmtpSettings__FromEmail=<tu-email-from>
SmtpSettings__FromName="Bite&Go"
Cloudinary__CloudName=<tu-cloud-name>
Cloudinary__ApiKey=<tu-cloudinary-api-key>
Cloudinary__ApiSecret=<tu-cloudinary-secret>
```

---

## 🐳 Docker Compose — Servicios

| Comando | Qué levanta |
|---------|-------------|
| `docker compose up --build` | Todo (excepto client-user-web y mobile) |
| `docker compose up --build auth-service` | Solo auth + Postgres |
| `docker compose up --build user-service` | Solo user + MongoDB + auth |
| `docker compose up --build admin-service` | Solo admin + MongoDB + auth |
| `docker compose up --build client-admin` | Solo admin frontend + backends |

---

## 🚢 Despliegue (Producción)

### Auth Service (.NET) — Render

```yaml
# Render Dashboard:
# - Runtime: Docker
# - Dockerfile: ./auth-service-bite-go/Dockerfile
# - Environment Variables:
#   JwtSettings__SecretKey, JwtSettings__Issuer, JwtSettings__Audience
#   ConnectionStrings__DefaultConnection=<external-postgres-url>
#   SmtpSettings__*, Cloudinary__*, Brevo__*
#   AppSettings__FrontendUrl=https://client-user.vercel.app
```

### User / Admin Service (Node) — Render

```yaml
# Render Dashboard:
# - Runtime: Docker
# - Puerto: 3001 (user) / 3002 (admin)
# - Environment Variables:
#   JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE
#   URL_MONGODB=<atlas-connection-string>
#   AUTH_SERVICE_URL, INTER_SERVICE_SECRET
#   CLOUDINARY_*, ALLOWED_ORIGIN
```

### Frontends Web — Vercel

```bash
# Cada frontend se despliega desde su propio repo:
cd client-user-bite-go  # o client-admin-bite-go
vercel --prod
```

**Variables de entorno en Vercel:**

| App | Variable | Valor |
|-----|----------|-------|
| Cliente | `VITE_AUTH_URL` | `https://auth-service.onrender.com` |
| Cliente | `VITE_API_URL` | `https://user-service.onrender.com/bite-and-go/v1` |
| Admin | `VITE_AUTH_URL` | `https://auth-service.onrender.com` |
| Admin | `VITE_API_URL` | `https://admin-service.onrender.com/bite-and-go/v1` |

### App Mobile — Expo / EAS

```bash
cd client-user-mobile-bite-go
eas build --platform all
eas submit --platform all
```

> Las variables de entorno se inyectan via `app.json` `extra` o con EAS Secrets.

---

## 👥 Roles del Sistema

| Rol | Acceso | Frontend |
|-----|--------|-----------|
| **SuperAdmin** | Total — todos los módulos y restaurantes | Admin |
| **Admin_Restaurante** | Restaurante asignado (gestión completa) | Admin |
| **Mesero** | Pedidos y mesas en sala | Admin (limitado) |
| **Cocinero** | Cola de cocina, marcar pedidos como listos | Admin (limitado) |
| **Repartidor** | Pedidos para domicilio | Mobile |
| **Cliente** | Usuario final — frontend web/mobile | Cliente |

### Credenciales por defecto (desarrollo)

```
Email: superadmin@bitego.local
Password: BiteGo1234!
```

---

## ❓ Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| `401 Unauthorized` en admin/user | JWT_SECRET diferente entre servicios | Verificar `.env` raíz — usa `docker compose config` |
| `ECONNREFUSED` a PostgreSQL | Healthcheck de Postgres no termina | Esperar ~15s en primer arranque |
| `JWT SecretKey not configured` | Falta `.env` raíz | `cp .env.example .env` |
| Error al enviar email | Brevo API Key incorrecta | Verificar en dashboard.brevo.com |
| `Authentication failed` SMTP | App Password con espacios | Regenerar y pegar sin espacios |
| Cold start lento (Render) | Free tier spindown tras 15 min | UptimeRobot configurado |
| 503 en forgot-password | Fila corrupta en user_password_reset | `DELETE FROM "user_password_reset" WHERE "Id" = ''` |

---

## 🧪 Probar el Flujo End-to-End

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3000/api/v1/Auth/register \
  -F "name=Juan" -F "surname=Perez" \
  -F "username=juanp" -F "email=juan@demo.com" \
  -F "password=SuperSeguro1!" -F "phone=55512345"

# 2. Verificar email (o marcar status=true en BD)
# 3. Login
curl -X POST http://localhost:3000/api/v1/Auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrUsername":"juanp","password":"SuperSeguro1!"}'

# 4. Health check user-service
curl http://localhost:3001/health

# 5. Health check admin-service
curl http://localhost:3002/health
```
