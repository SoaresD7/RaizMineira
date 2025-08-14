package com.example.raizMineira.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.raizMineira.model.Reserva;
import com.example.raizMineira.repository.ReservaRepository;

@Service
public class ReservaService {
    @Autowired
    private com.example.raizMineira.repository.ClienteRepository clienteRepo;

    /**
     * Retorna reservas com dados completos do cliente.
     */
    public List<com.example.raizMineira.dto.ReservaClienteDTO> listarReservasComCliente() {
        List<Reserva> reservas = repo.findAll();
        List<com.example.raizMineira.dto.ReservaClienteDTO> dtos = new java.util.ArrayList<>();
        for (Reserva r : reservas) {
            com.example.raizMineira.model.Cliente c = r.getIdCliente() != null ? clienteRepo.findById(r.getIdCliente()).orElse(null) : null;
            com.example.raizMineira.dto.ReservaClienteDTO dto = new com.example.raizMineira.dto.ReservaClienteDTO();
            dto.setIdReserva(r.getId());
            dto.setIdMesa(r.getIdMesa());
            dto.setStatus(r.getStatus());
            dto.setLugares(r.getLugares());
            dto.setDataReserva(r.getDataReserva());
            dto.setHoraReserva(r.getHoraReserva());
            if (c != null) {
                dto.setClienteNome(c.getNome());
                dto.setClienteCpf(c.getCpf());
                dto.setClienteEmail(c.getEmail());
                dto.setClienteTelefone(c.getTelefone());
            }
            dtos.add(dto);
        }
        return dtos;
    }

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
            // Gera código aleatório de 6 dígitos único
            String codigo;
            while (true) {
                codigo = String.format("%06d", (int)(Math.random()*1000000));
                boolean existe = false;
                for (Reserva r : repo.findAll()) {
                    if (codigo.equals(r.getCodigoReserva())) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) break;
            }
            nova.setCodigoReserva(codigo);
            return repo.save(nova);
    }
}
