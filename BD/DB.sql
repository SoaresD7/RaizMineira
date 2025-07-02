CREATE DATABASE IF NOT EXISTS raiz_mineira;
USE raiz_mineira;

-- Tabelas necessárias (somente as solicitadas: itens no cardápio, mesas, pedidos e reservas)

CREATE TABLE IF NOT EXISTS mesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Disponível'
);

CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100) NOT NULL,
    id_mesa INT,
    data_reserva DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Pendente',
    FOREIGN KEY (id_mesa) REFERENCES mesas(id)
);

-- Criando a tabela comandas (necessária para referência na tabela pedidos)
CREATE TABLE IF NOT EXISTS comandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT,
    status VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_comanda INT,
    id_mesa INT,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Em Preparação',
    total DECIMAL(10,2),
    FOREIGN KEY (id_comanda) REFERENCES comandas(id),
    FOREIGN KEY (id_mesa) REFERENCES mesas(id)
);

CREATE TABLE IF NOT EXISTS itens_cardapio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    categoria VARCHAR(50),
    preco DECIMAL(10,2) NOT NULL
);

-- Criando tabela produtos, necessária para os SELECTs
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    preco DECIMAL(10,2)
);

-- Criando tabela itens_pedido, necessária para os SELECTs
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    preco_unitario DECIMAL(10,2),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

-- Criando tabela demandas, necessária para os SELECTs
CREATE TABLE IF NOT EXISTS demandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    status VARCHAR(50)
);

-- Criando tabela estoque, necessária para os SELECTs
CREATE TABLE IF NOT EXISTS estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(100),
    quantidade INT,
    unidade VARCHAR(20)
);

-- Agora sim os SELECTs podem rodar sem erro

-- Selecionar todos os produtos
SELECT * FROM produtos;

-- Selecionar todos os produtos de uma categoria específica
SELECT * FROM produtos WHERE categoria = 'Entrada';

-- Selecionar todos os pedidos e suas respectivas comandas
SELECT p.id, p.status, p.data_pedido, p.total, c.id AS comanda_id
FROM pedidos p
JOIN comandas c ON p.id_comanda = c.id;

-- Selecionar todos os itens de um pedido específico
SELECT ip.id, ip.quantidade, ip.preco_unitario, pr.nome
FROM itens_pedido ip
JOIN produtos pr ON ip.id_produto = pr.id
WHERE ip.id_pedido = 1;  -- Substitua o 1 pelo ID do pedido desejado

-- Selecionar todas as mesas e seus status
SELECT * FROM mesas;

-- Selecionar todas as demandas, incluindo o tipo e status
SELECT * FROM demandas;

-- Selecionar todos os pedidos abertos
SELECT * FROM pedidos WHERE status = 'Em Preparação';

-- Selecionar reservas de um cliente específico
SELECT * FROM reservas WHERE nome_cliente = 'João Silva';

-- Selecionar todas as comandas abertas
SELECT * FROM comandas WHERE id IN (
    SELECT id_comanda FROM pedidos WHERE status = 'Em Preparação'
);

-- Selecionar estoque de um produto específico
SELECT * FROM estoque WHERE nome_produto = 'Coca-Cola';

-- Selecionar todas as reservas com status 'Confirmada'
SELECT * FROM reservas WHERE status = 'Confirmada';

-- Selecionar o total de pedidos de uma comanda específica
SELECT SUM(p.total) AS total_comanda
FROM pedidos p
WHERE p.id_comanda = 1;  -- Substitua o 1 pelo ID da comanda desejada

-- Selecionar todos os produtos
SELECT * FROM produtos;
