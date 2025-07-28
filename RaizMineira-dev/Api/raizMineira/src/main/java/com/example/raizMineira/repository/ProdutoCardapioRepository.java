package com.example.raizMineira.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.raizMineira.model.ProdutoCardapio;
import com.example.raizMineira.model.TipoProduto;

public interface ProdutoCardapioRepository extends JpaRepository<ProdutoCardapio, Long> {
    List<ProdutoCardapio> findByTipo(TipoProduto tipo);
}
