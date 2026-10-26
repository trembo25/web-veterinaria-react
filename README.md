# 🐾 Web Veterinaria

Aplicación web para una veterinaria que permite consultar servicios, iniciar sesión como usuario o administrador, agendar citas y pagar los servicios seleccionados.

Incluye un panel de administración para crear y eliminar servicios, visualizar las citas de todos los clientes y consultar sus referencias.

## 👥 Integrantes

- Cristhian Llontop
- Gabriel Gonzales
- Ignacio Gonzales

## 🎯 Objetivo

Facilitar el acceso a servicios veterinarios mediante una plataforma que reúna la consulta de servicios, el agendamiento de citas y el pago en un mismo lugar.

Para la administración, centraliza la gestión de los servicios ofrecidos y la revisión de las citas de los clientes.

## ✨ Funcionalidades

### Usuario

- Consultar los servicios disponibles de la veterinaria.
- Iniciar sesión como usuario.
- Agendar una cita para un servicio.
- Pagar el servicio seleccionado.

### Administrador

- Iniciar sesión como administrador.
- Crear nuevos servicios veterinarios.
- Eliminar servicios existentes.
- Visualizar las citas de todos los clientes.
- Consultar las referencias de los clientes.

## 🛠️ Tecnologías y herramientas

| Tecnología | Uso |
|---|---|
| React | Desarrollo de la interfaz de usuario |
| TypeScript | Desarrollo del código con tipado |
| CSS | Estilos de la aplicación |
| Vite | Herramienta de desarrollo y construcción |
| Vitest | Configuración y ejecución de pruebas |
| ESLint | Análisis estático del código |
| npm | Gestión de dependencias |
| Git y GitHub | Control de versiones y colaboración |

## 📁 Estructura del proyecto

```text
web-veterinaria-react/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── routes/
│   ├── test/
│   ├── Admin.css
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

### Organización de componentes

Los componentes se encuentran agrupados en tres niveles:

- `atoms/`: componentes básicos y reutilizables.
- `molecules/`: agrupaciones de componentes básicos.
- `organisms/`: componentes de mayor tamaño que reúnen varios elementos de la interfaz.

### Organización general

- `assets/`: recursos utilizados por la aplicación.
- `context/`: contextos de React.
- `data/`: datos utilizados por el proyecto.
- `pages/`: páginas de la aplicación.
- `routes/`: organización de las rutas.
- `test/`: archivos de pruebas.
- `types.ts`: definiciones de tipos de TypeScript.
- `App.tsx`: componente principal de la aplicación.
- `main.tsx`: punto de entrada de la aplicación.

## 🚀 Instalación y ejecución

### Requisitos previos

- Node.js y npm.
- Git.

### 1. Clonar el repositorio

```bash
git clone [https://github.com/trembo25/web-veterinaria-react.git](https://github.com/trembo25/web-veterinaria-react.git)
```

### 2. Entrar a la carpeta del proyecto

```bash
cd web-veterinaria-react
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Consultar los comandos disponibles

```bash
npm run
```

Los comandos de ejecución, construcción y pruebas están definidos en la sección `scripts` del archivo `package.json`.

Si el proyecto tiene definido el script `dev`, inicia el entorno de desarrollo con:

```bash
npm run dev
```

Abre en el navegador la dirección que indique la terminal.

## 🧪 Pruebas

El proyecto cuenta con una carpeta `src/test/` y un archivo de configuración `vitest.config.ts`.

Para ejecutar las pruebas, utiliza el script correspondiente definido en `package.json`. Si se encuentra definido como `test`, ejecuta:

```bash
npm run test
```

## 📦 Construcción

Si el archivo `package.json` incluye el script `build`, genera la versión de producción con:

```bash
npm run build
```

Si incluye el script `preview`, puedes previsualizar la construcción con:

```bash
npm run preview
```

## 🔐 Roles del sistema

| Funcionalidad | Usuario | Administrador |
|---|:---:|:---:|
| Consultar servicios | ✅ | — |
| Iniciar sesión según su rol | ✅ | ✅ |
| Agendar un servicio | ✅ | — |
| Pagar un servicio | ✅ | — |
| Crear servicios | — | ✅ |
| Eliminar servicios | — | ✅ |
| Ver las citas de todos los clientes | — | ✅ |
| Consultar referencias de los clientes | — | ✅ |

## 🔄 Organización de ramas

- `main`: rama principal destinada a la versión estable.
- `develops`: rama de integración y desarrollo.

### Flujo de trabajo del equipo

1. Crear una rama de trabajo desde `develops`.
2. Implementar los cambios.
3. Ejecutar las pruebas y revisar el funcionamiento.
4. Crear un Pull Request hacia `develops`.
5. Integrar `develops` en `main` cuando los cambios estén validados.

## 👨‍💻 Equipo de desarrollo

Desarrollado por Cristhian Llontop, Gabriel Gonzales e Ignacio Gonzales.
