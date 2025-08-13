-- 1. Criação do banco de dados
CREATE DATABASE IF NOT EXISTS raizMineira
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE raizMineira;

-- 2. Tabela de clientes (para referenciar em comandas, pedidos e reservas)
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabela: Cardápio
CREATE TABLE IF NOT EXISTS cardapio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    tipo ENUM('entradas','pratosprincipais','pratosvegetarianos','sobrimesas','bebidas','extras') NOT NULL,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Tabela: Mesas
CREATE TABLE IF NOT EXISTS mesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'DISPONIVEL',
    lugares INT NOT NULL DEFAULT 4,
    observacao TEXT,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Tabela: Demandas (suporte, manutenção etc.)
CREATE TABLE IF NOT EXISTS demandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    descricao TEXT,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Tabela: Comandas
CREATE TABLE IF NOT EXISTS comandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mesa INT NOT NULL,
    id_cliente INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ABERTA',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mesa)    REFERENCES mesas(id),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
) ENGINE=InnoDB;

-- 7. Tabela: Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_comanda INT NOT NULL,
    id_cliente INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'EM_PREPARO',
    valor_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    forma_pagamento VARCHAR(50),
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_comanda) REFERENCES comandas(id),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
) ENGINE=InnoDB;

-- 8. Tabela: Itens de Pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto BIGINT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido)   REFERENCES pedidos(id),
    FOREIGN KEY (id_produto)  REFERENCES cardapio(id)
) ENGINE=InnoDB;

-- 9. Tabela: Reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    lugares INT NOT NULL DEFAULT 1,
    data_reserva DATE NOT NULL,
    hora_reserva TIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'AGENDADA',
    id_mesa INT NOT NULL,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (id_mesa)     REFERENCES mesas(id),
    UNIQUE (data_reserva, hora_reserva, id_mesa)
) ENGINE=InnoDB;

-- 10. Views de Relatórios Diários

-- 10.1 Vendas do dia: lista reservas, mesas, total por reserva e forma de pagamento
CREATE VIEW vendas_dia AS
SELECT
  DATE(p.criado_em)            AS dia,
  r.id                        AS id_reserva,
  r.id_mesa                   AS id_mesa,
  p.id                        AS id_pedido,
  p.valor_total               AS valor_total,
  p.forma_pagamento           AS forma_pagamento,
  p.status                    AS status_pedido
FROM pedidos p
JOIN comandas c ON p.id_comanda = c.id
LEFT JOIN reservas r ON DATE(r.data_reserva) = DATE(p.criado_em) AND r.id_mesa = c.id_mesa;

-- 10.2 Pratos do dia: quantidade total de cada item vendido por dia
CREATE VIEW pratos_dia AS
SELECT
  DATE(p.criado_em)      AS dia,
  ip.id_produto          AS id_item,
  c.nome                 AS nome_item,
  SUM(ip.quantidade)     AS quantidade_vendida
FROM itens_pedido ip
JOIN pedidos p       ON ip.id_pedido = p.id
JOIN cardapio c      ON ip.id_produto = c.id
GROUP BY DATE(p.criado_em), ip.id_produto, c.nome;

-- 10.3 Resumo do dia: total de reservas, lucro e pedidos realizados
CREATE VIEW resumo_dia AS
SELECT
  dia,
  COUNT(DISTINCT id_reserva) AS total_reservas,
  SUM(valor_total)           AS lucro_total,
  COUNT(DISTINCT id_pedido)  AS total_pedidos
FROM (
  SELECT
    DATE(p.criado_em) AS dia,
    r.id               AS id_reserva,
    p.id               AS id_pedido,
    p.valor_total      AS valor_total
  FROM pedidos p
  LEFT JOIN comandas c ON p.id_comanda = c.id
  LEFT JOIN reservas r ON DATE(r.data_reserva) = DATE(p.criado_em) AND r.id_mesa = c.id_mesa
) AS sub
GROUP BY dia;

DELETE FROM cardapio WHERE nome = 'wawa';