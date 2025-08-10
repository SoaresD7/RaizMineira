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

    /**
     * Lista todas as reservas cadastradas.
     */
    public List<Reserva> listarTodas() {
        return repo.findAll();
    }

    /**
     * Lista reservas filtrando por CPF.
     */
    public List<Reserva> listarPorCpf(String cpf) {
        return repo.findByCpf(cpf);
    }

    /**
     * Cria uma nova reserva.
     * Aqui você pode incluir validações adicionais como:
     * - Verificar se a mesa está disponível no horário.
     * - Validar formato do CPF.
     */
    public Reserva criarReserva(Reserva nova) {
        return repo.save(nova);
    }
}
