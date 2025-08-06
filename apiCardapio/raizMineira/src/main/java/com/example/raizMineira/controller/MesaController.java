package com.example.raizMineira.controller;

import com.example.raizMineira.model.Mesa;
import com.example.raizMineira.service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mesas")
@CrossOrigin(origins = "*")
public class MesaController {

    @Autowired
    private MesaService service;

    // 1) Criar nova mesa
    @PostMapping
    public Mesa criar(@RequestBody Mesa mesa) {
        return service.criar(mesa);
    }

    // 2) Listar todas as mesas
    @GetMapping
    public List<Mesa> listar() {
        return service.listarTodas();
    }

    // 3) Buscar mesa por ID
    @GetMapping("/{id}")
    public Mesa buscarPorId(@PathVariable Integer id) {
        return service.buscarId(id);
    }

    // 4) Deletar mesa
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
