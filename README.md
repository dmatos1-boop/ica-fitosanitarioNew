# Sistema de Gestión Fitosanitaria ICA Colombia

Sistema web MVC+SOA para gestión fitosanitaria del sector hortofrutícola colombiano.

## Estructura del Proyecto

```
ica-sistema-fitosanitario/
├── src/                        ← FRONTEND Angular 21
│   ├── app/
│   │   ├── controlador/
│   │   ├── modelo/
│   │   ├── imagenes/
│   │   ├── soa/                ← Servicios Angular
│   │   └── vista/              ← Componentes UI
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── backend/                    ← BACKEND Node.js + TypeScript
│   ├── src/
│   │   ├── app.ts
│   │   ├── controladores/
│   │   ├── infraestructura/
│   │   ├── repositorios/
│   │   └── servicios/
│   └── package.json
├── package.json                ← Frontend dependencies
├── angular.json
└── tsconfig.json
```

## Cómo abrir en VS Code (una sola ventana)

Abre la carpeta raíz `ica-sistema-fitosanitario/` en VS Code.  
Verás frontend y backend en el mismo explorador de archivos.

## Comandos

### Frontend (desde raíz)
```bash
npm install
npm start          # → http://localhost:4200
```

### Backend (desde carpeta backend/)
```bash
cd backend
npm install
npm run dev        # → http://localhost:3000
```

## Stack

- **Frontend**: Angular 21, SSR, JWT
- **Backend**: Node.js, TypeScript, Express.js
- **BD**: MySQL — ica_fitosanitario
- **Auth**: JWT + bcryptjs

## Credenciales de prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Funcionario ICA | funcionario@ica.gov.co | 123456 |
| Técnico | juan.tecnico@ica.gov.co | 123456 |

## Autores

- **Daniel Matos** — Backend + integración
- **José Moreno** — Frontend / diseño
