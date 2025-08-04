-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS raizMineira;
USE raizMineira;

-- Tabela: Cardápio
CREATE TABLE IF NOT EXISTS cardapio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    tipo ENUM('PRATO', 'BEBIDA', 'ACOMPANHAMENTO', 'SOBREMESA') NOT NULL
);

-- Tabela: Mesas
CREATE TABLE IF NOT EXISTS mesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'DISPONIVEL'
);

-- Tabela: Comandas
CREATE TABLE IF NOT EXISTS comandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mesa INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ABERTA',
    data_abertura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_fechamento DATETIME,
    FOREIGN KEY (id_mesa) REFERENCES mesas(id)
);

-- Tabela: Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_comanda INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'EM_PREPARO',
    data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (id_comanda) REFERENCES comandas(id)
);

-- Tabela: Itens do pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto BIGINT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    FOREIGN KEY (id_produto) REFERENCES cardapio(id)
);

-- Tabela: Demandas
CREATE TABLE IF NOT EXISTS demandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    descricao TEXT
);

-- Tabela: Reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100) NOT NULL,
    data_reserva DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'AGENDADA',
    id_mesa INT NOT NULL,
    FOREIGN KEY (id_mesa) REFERENCES mesas(id),
    UNIQUE(data_reserva, id_mesa)
);
