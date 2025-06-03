# 💧 Aquabrym Frontend

**Aquabrym** es una aplicación web enfocada en **monitorear el consumo de agua** en tiempo real, ya sea en hogares o instituciones.
 Esta interfaz web se conecta con sensores físicos mediante circuitos **Arduino**, permitiendo a los usuarios 
 visualizar datos y recibir recomendaciones para reducir el gasto de agua y ahorrar dinero mensualmente.

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
