package com.example.raizMineira.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "CPF é obrigatório")
    @Size(min = 11, max = 11, message = "CPF deve ter 11 caracteres")
    @Column(length = 11, nullable = false)
    private String cpf;

    @NotNull(message = "ID do cliente é obrigatório")
    @Column(name = "id_cliente")
    private Integer idCliente;

    @NotNull(message = "Quantidade de lugares é obrigatória")
    @Min(value = 1, message = "Deve ter pelo menos 1 lugar")
    @Column(nullable = false)
    private Integer lugares = 1;

    @NotNull(message = "Data da reserva é obrigatória")
    @Column(name = "data_reserva", nullable = false)
    private LocalDate dataReserva;

    @NotNull(message = "Hora da reserva é obrigatória")
    @Column(name = "hora_reserva", nullable = false)
    private LocalTime horaReserva;

    @NotBlank(message = "Status é obrigatório")
    @Column(nullable = false)
    private String status = "AGENDADA";

    @NotNull(message = "ID da mesa é obrigatório")
    @Column(name = "id_mesa", nullable = false)
    private Integer idMesa;

    // Construtor vazio
    public Reserva() {}

    // Getters e setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Integer getIdCliente() {
        return idCliente;
    }
    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getLugares() {
        return lugares;
    }
    public void setLugares(Integer lugares) {
        this.lugares = lugares;
    }

    public LocalDate getDataReserva() {
        return dataReserva;
    }
    public void setDataReserva(LocalDate dataReserva) {
        this.dataReserva = dataReserva;
    }

    public LocalTime getHoraReserva() {
        return horaReserva;
    }
    public void setHoraReserva(LocalTime horaReserva) {
        this.horaReserva = horaReserva;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getIdMesa() {
        return idMesa;
    }
    public void setIdMesa(Integer idMesa) {
        this.idMesa = idMesa;
    }
}
