package com.example.raizMineira.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.raizMineira.model.Reserva;
import com.example.raizMineira.repository.ReservaRepository;

@Service
public class ReservaService {

    private final ReservaRepository repo;

    public ReservaService(ReservaRepository repo) {
        this.repo = repo;
    }

    public List<Reserva> listarPorCpf(String cpf) {
        return repo.findByCpf(cpf);
    }

    public Reserva criarReserva(Reserva nova) {
        // opcional: aqui você pode checar disponibilidade de mesa, formato de CPF, etc.
        return repo.save(nova);
    }
}
