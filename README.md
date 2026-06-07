# Laboratorio: Pruebas Unitarias y de Integración con Vitest

## Objetivo

Aprender a escribir y ejecutar **pruebas unitarias** y **pruebas de integración** para una aplicación web frontend (HTML + CSS + JavaScript) utilizando el framework [Vitest](https://vitest.dev/).

## Descripción del Proyecto

Este proyecto es una aplicación simple de **Lista de Tareas (Todo List)**. Permite al usuario:

- Agregar nuevas tareas con validación y formateo de texto.
- Marcar tareas como completadas.
- Eliminar tareas individuales.
- Limpiar todas las tareas completadas.
- Ver un contador de tareas pendientes.

La aplicación está organizada en **módulos separados** para facilitar las pruebas:

| Módulo | Ubicación | Responsabilidad |
|--------|-----------|-----------------|
| Utilidades de texto | `src/js/utils/texto.js` | Funciones puras: `validarTexto`, `formatearTexto` |
| Manipulación del DOM | `src/js/dom/todo.js` | Crear, eliminar, alternar tareas; vincular eventos |
| Punto de entrada | `src/js/app.js` | Inicializar la aplicación cuando el DOM está listo |

## Estructura del Proyecto

```
vitest-fe-sample-01/
├── index.html                  # Página principal de la aplicación
├── package.json                # Dependencias y scripts
├── vitest.config.js            # Configuración de Vitest (jsdom + globals)
├── README.md                   # Este archivo
├── src/
│   ├── css/
│   │   └── styles.css          # Estilos de la aplicación
│   └── js/
│       ├── app.js              # Punto de entrada
│       ├── utils/
│       │   └── texto.js        # Funciones utilitarias (validar, formatear)
│       └── dom/
│           └── todo.js         # Manipulación del DOM y lógica de tareas
└── tests/
    ├── unit/
    │   └── texto.test.js       # Pruebas unitarias de las funciones de texto
    └── integration/
        └── todo.test.js        # Pruebas de integración de manipulación del DOM
```

## Requisitos Previos

- [Node.js](https://nodejs.org/) versión 18 o superior.
- npm (incluido con Node.js).

## Instalación

```bash
# 1. Clonar o descargar el proyecto
cd vitest-fe-sample-01

# 2. Instalar las dependencias
npm install
```

## Ejecutar las Pruebas

### Opción 1 — Dashboard visual en el navegador (recomendado)

```bash
npm run test:ui
```

Esto abre automáticamente `http://localhost:51204/__vitest__/` en tu navegador con una interfaz gráfica que muestra:

- **Panel izquierdo**: lista de archivos de prueba y sus resultados (✓ pasa / ✗ falla).
- **Panel central**: cada `describe` e `it` colapsable con su estado.
- **Panel derecho**: código fuente de la prueba seleccionada.
- Las pruebas se **re-ejecutan automáticamente** al guardar cualquier archivo.
- Incluye un **filtro** para buscar pruebas por nombre.
- Puedes hacer clic en una prueba individual para re-ejecutarla sin correr las demás.

### Opción 2 — Modo watch en terminal

```bash
npm run test:watch
```

Ejecuta las pruebas y se queda observando cambios. Presiona `h` para ver todos los atajos de teclado, `q` para salir.

### Opción 3 — Ejecución única

```bash
npm test
```

Ejecuta todas las pruebas una sola vez y muestra el resumen. Ideal para CI/CD o para verificar todo antes de entregar.

### Opción 4 — Cobertura de código

```bash
npm run test:coverage
```

Ejecuta las pruebas y genera un reporte de cobertura (requiere instalar `@vitest/coverage-v8`).

---

## Ejecutar la Aplicación

Dado que la app usa módulos ES (`type="module"`), no funciona abriendo `index.html` directamente con `file://` por restricciones CORS del navegador. Tienes dos opciones:

### Con Live Server (VS Code)

1. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
2. Clic derecho sobre `index.html` → **"Open with Live Server"**.
3. El navegador se abre en `http://127.0.0.1:5500` y se recarga automáticamente al guardar cambios.

### Con Live Server (línea de comandos)

```bash
npx live-server --port=5500
```

Abre `http://127.0.0.1:5500` en tu navegador con recarga automática.

---

## Tarea: Implementar Pruebas Faltantes

A continuación se describen las tareas que debes completar. Cada tarea requiere que escribas nuevas pruebas o extiendas las existentes.

### Tarea 1 — Pruebas Unitarias Adicionales (30%)

En el archivo `tests/unit/texto.test.js`, agrega pruebas para los siguientes casos que **no están cubiertos** actualmente:

1. **validarTexto**: texto con caracteres especiales (emojis, tildes, eñes).
2. **validarTexto**: texto que contiene exactamente 3 espacios y luego una letra (ej. `"   A"`).
3. **formatearTexto**: texto con caracteres especiales como `"árbol"` (debe resultar en `"Árbol"`).
4. **formatearTexto**: texto que ya está correctamente formateado (no debe alterarse).

Crea un bloque `describe` nuevo llamado `'Pruebas adicionales — Tarea 1'` dentro del mismo archivo.

### Tarea 2 — Pruebas de Integración Adicionales (40%)

En el archivo `tests/integration/todo.test.js`, agrega pruebas para:

1. Verificar que al hacer clic en el botón de eliminar de un elemento creado con `crearTareaElemento`, el elemento se elimina de la lista.
2. Verificar que el evento `change` del checkbox alterna correctamente la clase `completada` (simulando un clic real con `dispatchEvent`).
3. Probar `agregarTarea` con un texto de exactamente 200 caracteres (debe ser exitoso).
4. Probar `limpiarCompletadas` cuando **todas** las tareas están completadas (la lista debe quedar vacía).

Crea un bloque `describe` nuevo llamado `'Pruebas adicionales — Tarea 2'`.

### Tarea 3 — Nueva Función y sus Pruebas (30%)

1. Agrega una nueva función `contarPalabras(texto)` en `src/js/utils/texto.js` que:
   - Reciba un string y retorne el número de palabras (separadas por espacios).
   - Retorne 0 si el string está vacío o solo tiene espacios.
   - Lance un `Error` si el argumento no es un string.

2. Escribe al menos **5 pruebas unitarias** para `contarPalabras` en `tests/unit/texto.test.js`.

3. Modifica `src/js/dom/todo.js` para que, al agregar una tarea, se valide que el texto tenga **al menos 2 palabras** usando `contarPalabras`. Si no cumple, debe mostrarse un mensaje de error: `"La tarea debe tener al menos 2 palabras."`

4. Escribe al menos **2 pruebas de integración** que verifiquen esta nueva validación.

---

## Criterios de Evaluación

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **Tarea 1** | 30% | Las 4 pruebas unitarias adicionales están correctamente implementadas y pasan. |
| **Tarea 2** | 40% | Las 4 pruebas de integración adicionales están correctamente implementadas y pasan. |
| **Tarea 3** | 30% | La función `contarPalabras` está implementada, sus 5 pruebas unitarias y 2 de integración pasan, y la validación de 2 palabras funciona en la UI. |

### Requisitos Transversales

- **Todas las pruebas deben pasar** ejecutando `npm test`.
- Las pruebas deben ser **independientes entre sí** (no deben depender del orden de ejecución).
- Usar **nombres descriptivos** en los `it('debe ...')`.
- Seguir el patrón **AAA** (Arrange, Act, Assert) en cada prueba.

### Escala de Calificación

| Calificación | Condición |
|-------------|-----------|
| 10/10 | Las 3 tareas completas, sin errores, todas las pruebas pasan. |
| 8-9/10 | Las 3 tareas completas con errores menores en la implementación. |
| 6-7/10 | Tareas 1 y 2 completas; Tarea 3 con avance parcial. |
| 4-5/10 | Solo una tarea completa. |
| 1-3/10 | Intentos incompletos en una o más tareas. |

---

## Tecnologías Utilizadas

- [Vitest](https://vitest.dev/) — Framework de pruebas unitarias y de integración.
- [jsdom](https://github.com/jsdom/jsdom) — Simulación de un navegador en Node.js para probar manipulación del DOM.
- JavaScript ES Modules (ESM) nativo.
