const express = require("express");
const router = express.Router(); 
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

//1) La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

router.get("/", async (req, res) => {
    let limit = req.query.limit; 
    try {
        const arrayProductos = await manager.getProducts(); 

        if(limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

//2) La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 

    try {
        const productoBuscado = await manager.getProductById(parseInt(id)); 

        if (!productoBuscado) {
            res.send("Producto no encontrado");
        }else {
            res.send(productoBuscado);
        }

    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

//Agregar un nuevo producto:

router.post("/", async (req, res) => {
    const nuevoProducto = req.body; 

    try {
        await manager.addProduct(nuevoProducto);
        res.status(201).send("Producto agregado exitosamente");
    } catch (error) {
        res.status(500).send("Error del servidor");
    }})

    router.put("/:pid", async (req, res) => {
        const productoActualizado=req.body
        try{
        await manager.updateProduct(productoActualizado);
        res.status(201).send("Producto Actualizado correctamente")

    }catch (error) {
        res.status(404).send("El producto no existe")
    }})

    router.delete("/pid:",async (req,res)=>{
        const productoEliminado=req.body
        try{
            await manager.deleteProduct(productoEliminado)
            res.status(201).send("El producto Eliminado")
        } catch (error){
            res.status(500).send("Error al eliminar el archivo")
        

    }})

module.exports = router;