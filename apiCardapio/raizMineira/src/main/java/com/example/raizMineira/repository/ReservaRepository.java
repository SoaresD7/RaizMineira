package com.example.cadastroapi.repository;

import com.example.cadastroapi.model.Reserva;
import com.example.cadastroapi.model.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    boolean existsByMesaAndDataReserva(Mesa mesa, LocalDateTime dataReserva);
    List<Reserva> findByCpf(String cpf);
}
