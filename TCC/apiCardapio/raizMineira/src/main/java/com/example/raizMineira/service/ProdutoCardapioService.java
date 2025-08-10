package com.example.raizMineira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.raizMineira.model.ProdutoCardapio;
import com.example.raizMineira.model.TipoProduto;
import com.example.raizMineira.repository.ProdutoCardapioRepository;

@Service
public class ProdutoCardapioService {

    @Autowired
    private ProdutoCardapioRepository repository;

    public ProdutoCardapio salvar(ProdutoCardapio produto) {
        return repository.save(produto);
    }

    public List<ProdutoCardapio> listarTodos() {
        return repository.findAll();
    }

    public List<ProdutoCardapio> listarPorTipo(TipoProduto tipo) {
        return repository.findByTipo(tipo);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public ProdutoCardapio buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }
}
