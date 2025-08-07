package com.example.raizMineira.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.raizMineira.model.Reserva;
import com.example.raizMineira.service.ReservaService;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")  // ajuste conforme seu front-end
public class ReservaController {

    private final ReservaService service;

    public ReservaController(ReservaService service) {
        this.service = service;
    }

    /**
     * GET /api/reservas?cpf=12345678901
     * Retorna todas as reservas registradas para um dado CPF.
     */
    @GetMapping
    public ResponseEntity<List<Reserva>> listarPorCpf(@RequestParam String cpf) {
        List<Reserva> reservas = service.listarPorCpf(cpf);
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
    public ResponseEntity<Reserva> criar(@RequestBody Reserva reserva) {
        Reserva criada = service.criarReserva(reserva);
        return ResponseEntity.ok(criada);
    }
}
