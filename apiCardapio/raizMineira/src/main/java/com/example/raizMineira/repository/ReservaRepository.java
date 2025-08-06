package com.example.raizMineira.repository;

import com.example.raizMineira.model.Reserva;
import com.example.raizMineira.model.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    boolean existsByMesaAndDataReserva(Mesa mesa, LocalDateTime dataReserva);
    List<Reserva> findByCpf(String cpf);
}
