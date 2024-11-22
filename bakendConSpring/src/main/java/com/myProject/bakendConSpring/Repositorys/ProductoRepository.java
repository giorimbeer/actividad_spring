package com.myProject.bakendConSpring.Repositorys;

import com.myProject.bakendConSpring.Domain.Producto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// Maneja las funciones para interactuar con la base de datos

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long> {

    Producto findByNombre(String nombre);

    @Transactional
    void deleteByNombre(String nombre);

    @Query("SELECT DISTINCT p.categoria FROM Producto p")
    List<String> findCategorias();

    List<Producto> findByCategoria(String categoria);

}
