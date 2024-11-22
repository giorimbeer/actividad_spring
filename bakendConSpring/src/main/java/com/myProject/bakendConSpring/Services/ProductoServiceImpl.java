package com.myProject.bakendConSpring.Services;

import com.myProject.bakendConSpring.Domain.Producto;
import com.myProject.bakendConSpring.Domain.ProductoDTO;
import com.myProject.bakendConSpring.Repositorys.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

// Desarrolla las funciones definidas
// en ProductoService

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository repository;

    @Override
    public void crearProducto(ProductoDTO producto) {

        byte[] imageData = Base64.getDecoder().decode(producto.getImagen());

        String nombre = producto.getNombre().toLowerCase();
        String categoria = producto.getCategoria().toLowerCase();

        Producto p = new Producto(
                nombre,
                producto.getDescripcion(),
                producto.getPrecio(),
                imageData,
                categoria
        );

        repository.save(p);
    }

    @Override
    public List<Producto> leerProductos() {

        List<Producto> productos = new ArrayList<>();

        productos.addAll(repository.findAll());

        return productos;
    }

    @Override
    public Producto leerProducto(String nombre) {
        return repository.findByNombre(nombre);
    }

    @Override
    public void actualizarProducto(String nombre, ProductoDTO nuevosDatos) {

        Producto datos = repository.findByNombre(nombre);
        byte[] newImageData = Base64.getDecoder().decode(nuevosDatos.getImagen());

        datos.setNombre(nuevosDatos.getNombre());
        datos.setDescripcion(nuevosDatos.getDescripcion());
        datos.setPrecio(nuevosDatos.getPrecio());
        datos.setCategoria(nuevosDatos.getCategoria());
        datos.setImagen(newImageData);

        repository.save(datos);

    }

    @Override
    public void eliminarProducto(String nombre) {
        repository.deleteByNombre(nombre);
    }

    @Override
    public List<String> encontrarCategorias() {
        return repository.findCategorias();
    }

    @Override
    public List<Producto> buscarProductosPorCategoria(String categoria) {
        return repository.findByCategoria(categoria);
    }
}
