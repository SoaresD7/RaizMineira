package com.example.cadastroapi.controller;

import com.example.cadastroapi.model.Reserva;
import com.example.cadastroapi.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reserva")
@CrossOrigin(origins = "*")
public class CadastroController {
    @Autowired private ReservaService service;

    // 1) Cadastrar reserva
    @PostMapping
    public Reserva cadastrar(@RequestBody Reserva r) {
        return service.criar(r);
    }

    // 2) Ver reservas por CPF
    @GetMapping
    public List<Reserva> verPorCpf(@RequestParam String cpf) {
        return service.listarCpf(cpf);
    }

    // 3) Ver reserva por ID
    @GetMapping("/{id}")
    public Reserva verPorId(@PathVariable Integer id) {
        return service.buscarId(id);
    }

    // 4) Cancelar reserva
    @DeleteMapping("/{id}")
    public void cancelar(@PathVariable Integer id) {
        service.cancelar(id);
    }
}
