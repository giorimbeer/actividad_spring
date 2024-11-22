package com.myProject.bakendConSpring.Controllers;

import com.myProject.bakendConSpring.Domain.Producto;
import com.myProject.bakendConSpring.Domain.ProductoDTO;
import com.myProject.bakendConSpring.Services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

/*
Bean que se encarga de administrar el acceso a la api
*/

@RestController
@CrossOrigin("http://127.0.0.1:5500")
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @PostMapping
    public ResponseEntity<?> crearProducto(@RequestBody ProductoDTO producto) throws URISyntaxException {
        service.crearProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<Producto>>  getProductos(){

        List<Producto> productos = service.leerProductos();

        if (productos != null) return ResponseEntity.ok(service.leerProductos());
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<Producto> getProducto(@PathVariable String nombre){

        Producto producto = service.leerProducto(nombre);

        if (producto != null) return ResponseEntity.ok(producto);
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }

    @PutMapping("/{nombre}")
    public ResponseEntity<?> putProducto( @PathVariable String nombre, @RequestBody ProductoDTO nuevosDatos){

        try {
            service.actualizarProducto(nombre, nuevosDatos);
            return ResponseEntity.ok("Producto actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el producto");
        }

    }

    @DeleteMapping("/{nombre}")
    public ResponseEntity<?> deleteProducto(@PathVariable String nombre){
        service.eliminarProducto(nombre);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categorias")
    public ResponseEntity<?> getCategorias(){
        List<String> categorias = service.encontrarCategorias();

        if (categorias != null) return ResponseEntity.ok(categorias);
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }

    @GetMapping("/categorias/{categoria}")
    public ResponseEntity<?> getProductosPorCategoria(@PathVariable String categoria){
        List<Producto> productos = service.buscarProductosPorCategoria(categoria);

        if (productos != null) return ResponseEntity.ok(productos);
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }

}
