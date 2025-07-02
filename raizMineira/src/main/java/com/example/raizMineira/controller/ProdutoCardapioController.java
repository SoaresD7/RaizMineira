package com.example.raizMineira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.raizMineira.model.ProdutoCardapio;
import com.example.raizMineira.model.TipoProduto;
import com.example.raizMineira.service.ProdutoCardapioService;

@RestController
@RequestMapping("/api/cardapio")
@CrossOrigin(origins = "*")
public class ProdutoCardapioController {

    @Autowired
    private ProdutoCardapioService service;

    @PostMapping
    public ProdutoCardapio cadastrar(@RequestBody ProdutoCardapio produto) {
        return service.salvar(produto);
    }

    @GetMapping
    public List<ProdutoCardapio> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/tipo/{tipo}")
    public List<ProdutoCardapio> listarPorTipo(@PathVariable TipoProduto tipo) {
        return service.listarPorTipo(tipo);
    }

    @GetMapping("/{id}")
    public ProdutoCardapio buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
