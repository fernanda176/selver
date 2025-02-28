const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Simulación de una base de datos en memoria
let productos = [];
let idCounter = 1;

// API para agregar un producto
app.post('/productos', (req, res) => {
    const { nombre, precio, descripcion } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ mensaje: "El nombre y el precio son obligatorios." });
    }

    const nuevoProducto = { id: idCounter++, nombre, precio, descripcion };
    productos.push(nuevoProducto);

    res.status(201).json({ mensaje: "Producto agregado con éxito.", producto: nuevoProducto });
});

// API para actualizar un producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio, descripcion } = req.body;

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    if (nombre) producto.nombre = nombre;
    if (precio) producto.precio = precio;
    if (descripcion) producto.descripcion = descripcion;

    res.json({ mensaje: "Producto actualizado con éxito.", producto });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(Servidor corriendo en http://localhost:${port});
});