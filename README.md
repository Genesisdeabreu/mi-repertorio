# 🎵 Mi Repertorio

Aplicación **backend y frontend** creada con **Node.js** y **Express**, que permite gestionar un repertorio de canciones desde una interfaz web.  
El sistema permite **crear, leer, actualizar y eliminar** canciones usando un archivo `JSON` como base de datos local.

---

## 🛠️ Tecnologías usadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-black?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![File System](https://img.shields.io/badge/File_System-gray?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 🚀 ¿Cómo usarlo?

### ▶️ Clonar y ejecutar el proyecto

```bash
git clone https://github.com/Genesisdeabreu/mi-repertorio.git
cd mi-repertorio
npm install
node index.js 
```

---

### 📁 Estructura del proyecto
- **mi-repertorio/**: carpeta raíz del proyecto
- **index.js**: archivo principal con el servidor Express y las rutas
- **repertorio.json**: base de datos local (formato JSON)
- **public/index.html**: interfaz visual con formulario y tabla
- **.gitignore**: evita subir archivos innecesarios al repositorio
- **package.json**: configuración del proyecto y dependencias

---

### 🛠️ Funcionalidades del CRUD
1. **POST.** Crear: Agrega una nueva canción. Ruta: /canciones
2. **GET.** Leer: Muestra todas las canciones registradas. Ruta: /canciones
3. **PUT.** Actualizar: Edita una canción existente por su id. Ruta: /canciones/:id
4. **DELETE.** Eliminar: Borra una canción del repertorio por su id. Ruta: /canciones/:id

*Todas las canciones se guardan y modifican en el archivo local repertorio.json.*

---

### 📋 Requerimientos cumplidos del desafío
1. Crear un servidor con Express ✅
2. Servir archivos estáticos con express.static() ✅ 
3. Usar express.json() para recibir datos en formato JSON ✅ 
4. Leer y escribir archivos con el módulo fs ✅ 
5. Implementar operaciones CRUD completas (Create, Read, Update, Delete) ✅  
6. Conectar backend y frontend con fetch/axios ✅

---

### 👩‍💻 Autor
**Génesis de Abreu**  
*Desarrolladora Frontend Junior* 💻🎨✨  
[GitHub](https://github.com/Genesisdeabreu)

