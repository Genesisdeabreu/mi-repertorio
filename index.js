// Mi paso a paso de las rutas para agregar, registrar, editar y eliminar canciones del repertorio

// Importamos Express para crear el servidor:
const express = require('express')
// Importamos File System (fs) para leer y escribir archivos en formato JSON:
const fs = require('fs')
// Creamos una instancia de la app de Express: "estoy creando un servidor web con express y lo vamos a controlar usando la variable app":
const app = express()
// Definimos el puerto en el que va a correr el servidor, en este caso es el 3000:
const PORT = 3000
// Middleware para que Express entienda y use los datos que vienen en formato JSON:
app.use(express.json())
// Middleware para mostrar el frontend (HTML, JS, CSS) desde la carpeta public en el navegador:
app.use(express.static('public'))
// Nota: **Un middleware es una función que se ejecuta antes de llegar a una ruta y que procesa la petición de alguna manera**



// RUTA GET: Devuelve todas las canciones desde repertorio.json
app.get('/canciones', (req, res) => { // Creamos una ruta tipo GET para leer datos
  try { // Try es para capturar errores si algo falla cuando se lea el archivo
    const data = fs.readFileSync('repertorio.json', 'utf8') // Leemos el contenido del archivo: repertorio.json de forma SYNC (sincrónica)
    const canciones = JSON.parse(data) // Con JSON.parse convertimos el contenido a un array de objetos
    res.json(canciones) // Aquí respondemos al cliente (frontend) con ese array convertido de nuevo en JSON
  } catch (error) { // En caso de error, devolvemos un mensaje de error al cliente, en este caso el error 500:
    res.status(500).json({ mensaje: 'Error al leer el archivo JSON' })
  }
})// Esta función se ejecuta cuando el navegador o el frontend hace una petición a http://localhost:3000/canciones
// req: es la petición que llega del cliente (AQUÍ NO LO USAMOS) y res: es la respuesta que el servidor va a devolver
// Esta ruta lee el archivo repertorio.json, convierte el contenido en un array, lo envía al frontend como json
// Esta permite llenar la tablita cuando se carga la página



// RUTA POST: Recibe una nueva canción y la agrega al repertorio
// Esta función se ejecuta cuando el frontend envía datos a http://localhost:3000/canciones (cuando se envía una nueva canción)
app.post('/canciones', (req, res) => { // Definimos las ruta POST
  try { // Try para manejar errores de forma segura
    // Express (gracias a express.json) convierte el JSON recibido en un objeto de JavaScript:
    const nuevaCancion = req.body // Guardamos la canción en una variable llamada nuevaCancion
    // Leemos el archivo actual y lo convertimos a un array
    const data = fs.readFileSync('repertorio.json', 'utf8') // Aquí leemos el archivo repertorio.json que tiene las canciones guardadas
    const canciones = JSON.parse(data) // Aquí lo transformamos de: un texto plano -> a un array de objetos 
    canciones.push(nuevaCancion) // Usamos PUSH para agregar la canción al final del arreglo
    // Convertimos el array actualizado con JSON.stringify y lo guardamos de nuevo en repertorio.json:
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 2)) // El null, 2 sirve para que el archivo quede bien formateado y legible (con indentación de 2 espacios).
    // Enviamos una respuesta al navegador confirmando que la canción fue guardada con éxito. 201 significa "creado":
    res.status(201).json({ mensaje: 'Canción agregada correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar la canción' }) // Si algo sale mal arrojamos el error 500
  }
}) // Esta función recibe una canción desde el frontend, la agrega al archivo repertorio.json y envía un mensaje confirmando que fue guardada



// RUTA PUT: se usa para actualizar los recursos existentes, en este caso las canciones ya guardadas:
app.put('/canciones/:id', (req, res) => { // id significa que se espera un id dinámico en la url
  try { // Para tratar errores
    const { id } = req.params // Obtenemos el id que llega desde la url, ejemplo: si la URL es /canciones/123, id será "123" 
    const nuevaCancion = req.body // Recibimos la canción actualizada que viene del cuerpo del put
    const data = fs.readFileSync('repertorio.json', 'utf8') // Leemos el archivo repertorio.json y lo convertimos en un array
    let canciones = JSON.parse(data)
    const index = canciones.findIndex(c => c.id == id) // Buscamos la posición (índice) de la canción que tiene ese mismo id
    // Si no existe la canción, devolvemos un error 404:
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Canción no encontrada' })
    }
    // Reemplazamos la canción en esa posición:
    canciones[index] = nuevaCancion
    // Guardamos el nuevo array en el archivo:
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 2))
    // Respondemos con un mensaje de éxito si se guarda bien la canción:
    res.json({ mensaje: 'Canción actualizada correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la canción' }) // Si sale mal se arroja el error 500
  }
}) // Esta función busca la canción por el id, la reemplaza por la nueva, guarda el archivo actualizado e informa al usuario si la operación fue exitosa o no



// RUTA DELETE: se usa para eliminar recursos
app.delete('/canciones/:id', (req, res) => { // El id en la URL indica que se espera un identificador para saber qué canción eliminar
  try { // Para manejar errores
    // Obtenemos el id de la URL:
    const { id } = req.params
    // Leemos el archivo repertorio.json y lo convertimos en un array:
    const data = fs.readFileSync('repertorio.json', 'utf8')
    let canciones = JSON.parse(data)
    const index = canciones.findIndex(c => c.id == id) // Usamos findIndex para encontrar la posición del objeto que tiene ese id
    // Si no existe, respondemos con error 404:
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Canción no encontrada' })
    }
    // Usamos splice para eliminar la canción del array según su posición:
    canciones.splice(index, 1)
    // Guardamos el nuevo array sin esa canción
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 2))
    // Respondemos con éxito si la canción se elima bien:
    res.json({ mensaje: 'Canción eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la canción' }) // Si no enviamos este error 500
  }
}) // Esta función recibe el id de la canción desde la url, la elimina del archivo repertorio.json e informa al frontend si fue eliminada con éxito o si hubo un error



// Iniciamos el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})



// Otras notas:
// En package.json eliminamos la línea: "type": "module", para que funcione require() en CommonJs
// El index.html es el frontend que me dieron de apoyo
// En el repertorio.json lo dejamos con un [] que es un array vacío  para ir agregando y modificando las canciones
