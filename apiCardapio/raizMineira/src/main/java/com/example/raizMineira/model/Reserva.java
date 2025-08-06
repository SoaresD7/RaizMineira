package com.example.raizMineira.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")

public class Reserva {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome_cliente", nullable = false)
    private String nomeCliente;

    @Column(nullable = false, length = 11)
    private String cpf;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String telefone;

    @Column(name = "data_reserva", nullable = false)
    private LocalDateTime dataReserva;

    @Column(nullable = false)
    private Integer lugares;

    @Column(nullable = false)
    private String status = "AGENDADA";

    @ManyToOne
    @JoinColumn(name = "id_mesa", nullable = false)
    private Mesa mesa;

    // getters e setters
    public Integer getId() { 
        return id; }

    public void setId(Integer id) { 
        this.id = id; }

    public String getNomeCliente() { 
        return nomeCliente; }
        
    public void setNomeCliente(String nomeCliente) { 
        this.nomeCliente = nomeCliente; }

    public String getCpf() {
         return cpf; }

    public void setCpf(String cpf) { 
        this.cpf = cpf; }

    public String getEmail() { 
        return email; }

    public void setEmail(String email) { 
        this.email = email; }

    public String getTelefone() { 
        return telefone; }

    public void setTelefone(String telefone) { 
        this.telefone = telefone; }

    public LocalDateTime getDataReserva() { 
        return dataReserva; }

    public void setDataReserva(LocalDateTime dataReserva) { 
        this.dataReserva = dataReserva; }
    public Integer getLugares() { 
        return lugares; }

    public void setLugares(Integer lugares) { 
        this.lugares = lugares; }

    public String getStatus() { 
        return status; }

    public void setStatus(String status) { 
        this.status = status; }

    public Mesa getMesa() { 
        return mesa; }

    public void setMesa(Mesa mesa) { 
        this.mesa = mesa; }
}
