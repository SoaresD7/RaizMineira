package com.example.raizMineira.service;

import com.example.raizMineira.model.Mesa;
import com.example.raizMineira.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesaService {

    @Autowired
    private MesaRepository repository;

    public Mesa criar(Mesa mesa) {
        return repository.save(mesa);
    }

    public List<Mesa> listarTodas() {
        return repository.findAll();
    }

    public Mesa buscarId(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
