package com.example.raizMineira.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.raizMineira.model.Reserva;
import com.example.raizMineira.service.ReservaService;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*") // ajuste conforme seu front-end
public class ReservaController {

    private final ReservaService service;

    public ReservaController(ReservaService service) {
        this.service = service;
    }

    /**
     * GET /api/reservas
     * GET /api/reservas?cpf=12345678901
     * Retorna todas as reservas ou filtra por CPF, se informado.
     */
    @GetMapping
    public ResponseEntity<List<Reserva>> listar(@RequestParam(required = false) String cpf) {
        List<Reserva> reservas;

        if (cpf != null && !cpf.isBlank()) {
            reservas = service.listarPorCpf(cpf);
        } else {
            reservas = service.listarTodas();
        }

        if (reservas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reservas);
    }

    /**
     * POST /api/reservas
     * {
     *   "cpf": "12345678901",
     *   "idCliente": 5,
     *   "lugares": 4,
     *   "dataReserva": "2025-08-10",
     *   "horaReserva": "19:30:00",
     *   "idMesa": 2
     * }
     */
    @PostMapping
    public ResponseEntity<Reserva> criar(@Valid @RequestBody Reserva reserva) {
        Reserva criada = service.criarReserva(reserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }
}
