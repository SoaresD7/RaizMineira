package com.example.raizMineira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.raizMineira.model.Cliente;
import com.example.raizMineira.repository.ClienteRepository;

@Service
public class ClienteService {
    @Autowired
    private com.example.raizMineira.repository.ReservaRepository reservaRepo;

    public Cliente criarComReserva(com.example.raizMineira.dto.ClienteReservaDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setNome(dto.nome);
        cliente.setCpf(dto.cpf);
        cliente.setEmail(dto.email);
        cliente.setTelefone(dto.telefone);
        Cliente salvo = criar(cliente);

        com.example.raizMineira.model.Reserva reserva = new com.example.raizMineira.model.Reserva();
        reserva.setIdCliente(salvo.getId());
        reserva.setCpf(salvo.getCpf());
        reserva.setIdMesa(dto.idMesa);
        reserva.setLugares(dto.lugares != null ? dto.lugares : 1);
        reserva.setDataReserva(dto.dataReserva);
        reserva.setHoraReserva(dto.horaReserva);
        reserva.setStatus("AGENDADA");
        reserva.setObservacao(dto.observacao);
        // Gera código aleatório de 6 dígitos único
        String codigo;
        while (true) {
            codigo = String.format("%06d", (int)(Math.random()*1000000));
            boolean existe = false;
            for (com.example.raizMineira.model.Reserva r : reservaRepo.findAll()) {
                if (codigo.equals(r.getCodigoReserva())) {
                    existe = true;
                    break;
                }
            }
            if (!existe) break;
        }
        reserva.setCodigoReserva(codigo);
        reservaRepo.save(reserva);
        return salvo;
    }
    public Cliente buscarPorCpf(String cpf) {
        return repo.findByCpf(cpf)
            .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Cliente não encontrado."));
    }

    @Autowired
    private ClienteRepository repo;

    public Cliente criar(Cliente cliente) {
        if (repo.findByCpf(cliente.getCpf()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CPF já cadastrado.");
        }
        if (repo.findByEmail(cliente.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já cadastrado.");
        }
        return repo.save(cliente);
    }

    public List<Cliente> listar() {
        return repo.findAll();
    }

    public Cliente buscarId(Integer id) {
        return repo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
    }

    public void deletar(Integer id) {
        buscarId(id);
        repo.deleteById(id);
    }

    public Cliente atualizar(Integer id, Cliente clienteAtualizado) {
        Cliente clienteExistente = buscarId(id);
        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setEmail(clienteAtualizado.getEmail());
        clienteExistente.setTelefone(clienteAtualizado.getTelefone());
        return repo.save(clienteExistente);
    }
}
