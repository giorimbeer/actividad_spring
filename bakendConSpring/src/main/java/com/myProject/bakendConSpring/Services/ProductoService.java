package com.myProject.bakendConSpring.Services;

import com.myProject.bakendConSpring.Domain.Producto;
import com.myProject.bakendConSpring.Domain.ProductoDTO;

import java.util.List;

// define las funciones que deben tratar
// los datos que llegan y que se envian
// a la base de datos


public interface ProductoService {

    void crearProducto(ProductoDTO producto);

    List<Producto> leerProductos();

    Producto leerProducto(String nombre);

    void actualizarProducto(String nombre, ProductoDTO nuevosDatos);

    void eliminarProducto(String nombre);

    List<String> encontrarCategorias();

    List<Producto> buscarProductosPorCategoria(String categoria);

}
