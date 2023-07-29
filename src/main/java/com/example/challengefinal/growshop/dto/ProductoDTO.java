package com.example.challengefinal.growshop.dto;

import com.example.challengefinal.growshop.models.Categoria;
import com.example.challengefinal.growshop.models.Producto;

public class ProductoDTO {

    private Long id;

    private String nombre;
    private String marca;

    private String descripcion;

    private double precio;

    private Categoria tipoDeCategoria;

    private long cantidad;
    private boolean activo;

    public ProductoDTO(){}

    public ProductoDTO(Producto producto) {
        id = producto.getId();
        nombre = producto.getNombre();
        marca = producto.getMarca();
        descripcion = producto.getDescripcion();
        precio = producto.getPrecio();
        tipoDeCategoria = producto.getCategoria();
        cantidad = producto.getCantidad();
        activo = producto.isActivo();
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getMarca() {return marca;}

    public String getDescripcion() {
        return descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public Categoria getCategoria() {
        return tipoDeCategoria;
    }

    public long getCantidad() {
        return cantidad;
    }

    public boolean isActivo() {
        return activo;
    }
}
