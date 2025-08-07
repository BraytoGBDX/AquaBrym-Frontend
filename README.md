# 💧 Planteamiento del problema

La escasez de agua es una problemática crítica que afecta a diversas regiones a nivel mundial, impulsada por el cambio climático, el crecimiento poblacional y el uso ineficiente del recurso hídrico. En este contexto, se identificó una necesidad urgente de desarrollar herramientas tecnológicas accesibles que permitan a los usuarios monitorear y gestionar su consumo de agua de manera consciente y eficiente. A través de un diagnóstico del entorno, se evidenció la ausencia de soluciones que brinden visibilidad en tiempo real del uso del recurso, lo que dificulta la adopción de prácticas sostenibles. El proyecto AquaWatch surge como respuesta directa a esta necesidad, con el objetivo general de crear un sistema de monitoreo hídrico inteligente que promueva el uso responsable del agua mediante el análisis de datos. La propuesta se justifica en el potencial de las técnicas de análisis de datos para identificar patrones de consumo, generar alertas en tiempo real y recomendar estrategias personalizadas para la optimización del recurso, contribuyendo además al cumplimiento de los Objetivos de Desarrollo Sostenible (ODS), especialmente el ODS 6: Agua limpia y saneamiento.

---

## 🚀 Inicialización del proyecto (con pnpm)

### ✅ Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [`pnpm`](https://pnpm.io/) instalado globalmente

Instalación de `pnpm`:

```bash
npm install -g pnpm
```

---

### 📥 Clonar y preparar el proyecto

```bash
git clone https://github.com/tu-usuario/aquabrym-frontend.git
cd aquabrym-frontend
pnpm install
```

---

### 🧪 Ejecutar en modo desarrollo

```bash
pnpm run dev
```

Esto abrirá la app en tu navegador en `http://localhost:5173` (por defecto).

---

### 🏗️ Compilar para producción

```bash
pnpm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

---

### ⚙️ Estructura del proyecto

```plaintext
aquabrym-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## 📖 Descripción del Proyecto

Aquabrym combina tecnologías web modernas con hardware físico para crear una solución completa de ahorro de agua.

### 🛠️ ¿Cómo funciona?

- 🔧 Los sensores conectados a **Arduino** miden el flujo de agua.
- 🌐 Estos datos se envían a un servidor backend (no incluido aquí).
- 📊 La app frontend muestra la información en **tiempo real**.
- 💡 Se generan consejos automáticos para **reducir el consumo** y el gasto.

### 🎯 Beneficios clave

- Monitoreo en tiempo real del consumo de agua
- Mejora de hábitos de consumo
- Reducción de facturas mensuales
- Contribución al cuidado del medio ambiente

---

## 🧰 Tecnologías utilizadas

| Tecnología     | Descripción                                       |
|----------------|---------------------------------------------------|
| ⚛️ React        | Librería para construir interfaces de usuario     |
| ⚡ Vite         | Entorno de desarrollo rápido                      |
| 📦 pnpm         | Gestor de paquetes rápido y eficiente             |
| 📈 Charts       | Para visualización de consumo (gráficas)          |
| 🧠 Arduino      | Hardware que captura los datos del consumo        |

---

## 📌 Futuras mejoras

- [ ] Integración completa con backend vía WebSocket
- [ ] Autenticación de usuarios
- [ ] Visualización histórica por día/mes
- [ ] App móvil (PWA)

---

## 🧑‍💻 Autor

Desarrollado por **AquaBrym**  
📬 Contacto: [lculpa34gmail.com]

---
