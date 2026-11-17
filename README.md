# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

# web-veterinaria-react

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

## Conexión con el backend (usuarios y autenticación)

El registro, el login y "Restablecer contraseña" ya no usan `localStorage` para las cuentas: llaman a los microservicios del [backend](https://github.com/ignacioduoc/backend-veterinaria-react).

| Acción en la web | Microservicio | Petición |
|---|---|---|
| Crear cuenta | usuarios (8081) | `POST /usuarios/registro` |
| Iniciar sesión | autenticacion (8086) | `POST /auth/login` → devuelve el JWT |
| Restablecer, paso 1 | usuarios (8081) | `POST /usuarios/restablecer/verificar` |
| Restablecer, paso 2 | usuarios (8081) | `PUT /usuarios/restablecer` |

- Las peticiones están en `src/data/api.ts`, `src/data/usuarios.ts` y `src/data/auth.ts`.
- En el navegador solo queda la **sesión** (`nombre`, `email`, `rol` y `token`) en `src/data/sesion.ts`; nunca contraseñas. Si el token venció, la sesión se descarta al abrir la página.
- Para endpoints protegidos de otros servicios: `fetch(url, { headers: { ...cabeceraAutorizacion() } })`.
- Las direcciones se pueden cambiar con un `.env` (ver `.env.example`).

## 👨‍💻 Equipo de desarrollo

Desarrollado por Cristhian Llontop, Gabriel Gonzales e Ignacio Gonzales.
