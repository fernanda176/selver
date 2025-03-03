const express = require('express');
const mysql = require("mysql");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
host: "db4free.net",
user: "estudiantesweb",
password:"admin12345",
database:"cursoweb",
port:3306
 })
connection.connect (err=>{
    if(err) console.log("err", err);
    console.log("conectado a mysql")
})

app.get('/', (req, res) => {
    return res.send('Ingreso')
})

app.post("/create",(req,res)=>{
    console.log('data', req.body)
    const{ name, last_name, identification, email, phone } = req.body;
    connection.query('INSERT INTO student ( name, last_name, identification, email, phone) VALUES(?,?,?,?,?)',
    [ name, last_name, identification, email, phone], (err,result)=>{
        if(err) console.log('error data',err); 
        res.json({mensaje:"Person added"});
    });
});

app.listen(3000, () => {console.log("El servidor esta corriendo por el puerto 3000");
});

app.put("/U-person/:id",(req,res)=>{
    const {id} = req.params;
    const{email} =req.body;
    console.log('email', email)
    connection.query("UPDATE student set email=? where id =?",
        [email,id], (err,result)=>{
            if(err) return console.log('err', err)
            res.json({mensaje: "cambio concretado"})
        }
    )

}

)

 
/*
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
*/
// Iniciar el servidor

