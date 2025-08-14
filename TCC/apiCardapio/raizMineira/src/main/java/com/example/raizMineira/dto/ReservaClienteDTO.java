package com.example.raizMineira.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservaClienteDTO {
    private Integer idReserva;
    private Integer idMesa;
    private String status;
    private Integer lugares;
    private LocalDate dataReserva;
    private LocalTime horaReserva;
    private String clienteNome;
    private String clienteCpf;
    private String clienteEmail;
    private String clienteTelefone;

    // Getters e Setters
    public Integer getIdReserva() { return idReserva; }
    public void setIdReserva(Integer idReserva) { this.idReserva = idReserva; }
    public Integer getIdMesa() { return idMesa; }
    public void setIdMesa(Integer idMesa) { this.idMesa = idMesa; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getLugares() { return lugares; }
    public void setLugares(Integer lugares) { this.lugares = lugares; }
    public LocalDate getDataReserva() { return dataReserva; }
    public void setDataReserva(LocalDate dataReserva) { this.dataReserva = dataReserva; }
    public LocalTime getHoraReserva() { return horaReserva; }
    public void setHoraReserva(LocalTime horaReserva) { this.horaReserva = horaReserva; }
    public String getClienteNome() { return clienteNome; }
    public void setClienteNome(String clienteNome) { this.clienteNome = clienteNome; }
    public String getClienteCpf() { return clienteCpf; }
    public void setClienteCpf(String clienteCpf) { this.clienteCpf = clienteCpf; }
    public String getClienteEmail() { return clienteEmail; }
    public void setClienteEmail(String clienteEmail) { this.clienteEmail = clienteEmail; }
    public String getClienteTelefone() { return clienteTelefone; }
    public void setClienteTelefone(String clienteTelefone) { this.clienteTelefone = clienteTelefone; }
}
