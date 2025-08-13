package com.example.raizMineira;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.raizMineira.model.ProdutoCardapio;
import com.example.raizMineira.model.TipoProduto;
import com.example.raizMineira.service.ProdutoCardapioService;

@SpringBootTest
class RaizMineiraApplicationTests {

    // Injetamos o serviço real para interagir com o banco H2 de testes
    @Autowired
    private ProdutoCardapioService produtoCardapioService;

    
    // Teste básico para verificar se conseguimos salvar e buscar um produto no banco.
     
    @Test
    void deveSalvarEBuscarProdutoCardapioComSucesso() {
        System.out.println("[TESTE] Iniciando teste: salvar e buscar produto no cardápio");

        // Criando um produto novo com dados válidos
        ProdutoCardapio produto = new ProdutoCardapio();
        produto.setNome("Pão de Queijo");
        produto.setDescricao("Delicioso pão de queijo mineiro.");
        produto.setPreco(5.99);
        produto.setTipo(TipoProduto.entradas);

        System.out.println("[TESTE] Salvando produto: " + produto.getNome());

        // Salvando no banco via service (que usa repository)
        ProdutoCardapio produtoSalvo = produtoCardapioService.salvar(produto);

        // Verificando se o produto foi salvo com um ID gerado pelo banco
        assertNotNull(produtoSalvo.getId(), "O ID do produto não deve ser nulo após salvar");

        // Validando se o nome está correto após salvar
        assertEquals("Pão de Queijo", produtoSalvo.getNome(), "O nome do produto salvo deve ser 'Pão de Queijo'");

        System.out.println("[TESTE] Produto salvo com ID: " + produtoSalvo.getId());

        // Buscando o produto salvo pelo ID para garantir que está no banco
        ProdutoCardapio produtoBuscado = produtoCardapioService.buscarPorId(produtoSalvo.getId());

        // Validando se o produto foi encontrado no banco
        assertNotNull(produtoBuscado, "O produto buscado não deve ser nulo");

        // Verificando os dados do produto buscado
        assertEquals("Pão de Queijo", produtoBuscado.getNome(), "Nome do produto buscado deve ser 'Pão de Queijo'");
        assertEquals(TipoProduto.entradas, produtoBuscado.getTipo(), "Tipo do produto buscado deve ser ACOMPANHAMENTO");

        System.out.println("[TESTE] Teste finalizado com sucesso!");
    }
}
