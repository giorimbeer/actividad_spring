package com.myProject.bakendConSpring.Domain;

import jakarta.persistence.*;

// Formato en el que se envia y llega la informacion de la base de datos

@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre",unique = true ,nullable = false)
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Lob
    @Column(name = "imagen", unique = true , columnDefinition = "MEDIUMBLOB")
    private byte[] imagen;

    @Column(name = "categoria", nullable = false)
    private String categoria;

    public Producto() {
    }

    public Producto(String nombre, String descripcion, Double precio, byte[] imagen, String categoria) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }
}
