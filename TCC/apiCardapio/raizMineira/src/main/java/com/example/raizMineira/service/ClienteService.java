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
