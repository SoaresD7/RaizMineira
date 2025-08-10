package com.example.raizMineira.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.raizMineira.model.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    List<Reserva> findByCpf(String cpf);
}
