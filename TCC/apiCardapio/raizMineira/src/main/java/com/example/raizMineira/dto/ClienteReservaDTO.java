package com.example.raizMineira.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ClienteReservaDTO {
    // Dados do cliente
    public String nome;
    public String cpf;
    public String email;
    public String telefone;
    // Dados da reserva
    public Integer idMesa;
    public Integer lugares;
    public LocalDate dataReserva;
    public LocalTime horaReserva;
    public String observacao;
}
