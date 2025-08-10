package com.example.raizMineira.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.raizMineira.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByCpf(String cpf);
    Optional<Cliente> findByEmail(String email);
}
