package com.example.raizMineira.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 11, nullable = false)
    private String cpf;

    @Column(name="id_cliente")
    private Integer idCliente;

    @Column(name="lugares", nullable = false)
    private Integer lugares = 1;

    @Column(name="data_reserva", nullable = false)
    private LocalDate dataReserva;

    @Column(name="hora_reserva", nullable = false)
    private LocalTime horaReserva;

    @Column(nullable = false)
    private String status = "AGENDADA";

    @Column(name="id_mesa", nullable = false)
    private Integer idMesa;

    // getters e setters omitidos por brevidade
    // … 
}
