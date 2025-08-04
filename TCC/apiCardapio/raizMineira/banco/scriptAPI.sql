CREATE DATABASE raizMineira;
USE raizMineira;

CREATE TABLE produtos_cardapio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    tipo ENUM('PRATO', 'BEBIDA', 'ACOMPANHAMENTO', 'SOBREMESA') NOT NULL
);
