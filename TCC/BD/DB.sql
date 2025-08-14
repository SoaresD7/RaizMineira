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
/*
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


DELIMITER $$
CREATE TRIGGER gerar_codigo_aleatorio
BEFORE INSERT ON clientes
FOR EACH ROW
BEGIN
  SET NEW.codigo_aleatorio = LPAD(FLOOR(RAND() * 1000000), 6, '0');
END$$
DELIMITER ;
*/


-- Itens de exemplo para o cardápio
INSERT INTO cardapio (nome, descricao, preco, tipo) VALUES
  ('Porção de pão de queijo', 'Porção com 8 unidades de pão de queijo artesanal', 18.00, 'entradas'),
  ('Bolinho de mandioca', 'Bolinho de mandioca recheado com queijo minas', 16.00, 'entradas'),
  ('Feijoada mineira', 'Feijoada tradicional servida com arroz, couve e laranja', 38.00, 'pratosprincipais'),
  ('Frango com quiabo', 'Frango caipira ao molho com quiabo e polenta', 34.00, 'pratosprincipais'),
  ('Moqueca de banana da terra', 'Moqueca vegetariana de banana da terra com arroz', 29.00, 'pratosvegetarianos'),
  ('Quibe de abóbora', 'Quibe vegetariano de abóbora com salada fresca', 27.00, 'pratosvegetarianos'),
  ('Doce de leite com queijo', 'Doce de leite cremoso servido com queijo minas', 14.00, 'sobrimesas'),
  ('Pudim de café', 'Pudim artesanal feito com café mineiro', 15.00, 'sobrimesas'),
  ('Suco de laranja', 'Suco natural de laranja', 8.00, 'bebidas'),
  ('Refrigerante', 'Refrigerante lata diversos sabores', 7.00, 'bebidas'),
  ('Porção de arroz', 'Porção de arroz para duas pessoas', 12.00, 'extras'),
  ('Porção de farofa', 'Farofa crocante de bacon e ovos', 10.00, 'extras');

INSERT INTO mesas (numero, status, lugares, observacao) VALUES
(1,  'DISPONIVEL', 6, 'Perto da janela'),
(2,  'DISPONIVEL', 4, 'Canto aconchegante'),
(3,  'DISPONIVEL', 4, 'Ao lado do bar'),
(4,  'DISPONIVEL', 4, 'Próxima à saída'),
(5,  'DISPONIVEL', 4, 'Vista para jardim'),
(6,  'DISPONIVEL', 6, 'Mesa dupla central'),
(7,  'DISPONIVEL', 4, 'Perto do palco'),
(8,  'DISPONIVEL', 4, 'Ao fundo'),
(9,  'DISPONIVEL', 4, 'Próxima ao vitral'),
(10, 'DISPONIVEL', 4, 'Esquina iluminada'),
(11, 'DISPONIVEL', 4, 'Central VIP'),
(12, 'DISPONIVEL', 4, 'Ao lado do aquário'),
(13, 'DISPONIVEL', 6, 'Vista panorâmica'),
(14, 'DISPONIVEL', 4, 'Ambiente reservado'),
(15, 'DISPONIVEL', 4, 'Canto silencioso'),
(16, 'DISPONIVEL', 4, 'Perto da entrada'),
(17, 'DISPONIVEL', 4, 'Mesa familiar'),
(18, 'DISPONIVEL', 6, 'Junto ao buffet'),
(19, 'DISPONIVEL', 4, 'Central ampla'),
(20, 'DISPONIVEL', 4, 'Próxima às plantas'),
(21, 'DISPONIVEL', 4, 'Mesa comemorativa'),
(22, 'DISPONIVEL', 4, 'Ao lado do sofá'),
(23, 'DISPONIVEL', 4, 'Canto íntimo'),
(24, 'DISPONIVEL', 4, 'Em destaque');


-- rodar cliente depois api depois o insert de reservas


-- Cliente 1
INSERT INTO clientes (nome, cpf, email, telefone) VALUES ('Ana Silva', '87283928374', 'ana@email.com', '31999990001');
INSERT INTO reservas (codigo_reserva, cpf, id_cliente, id_mesa, lugares, data_reserva, hora_reserva, status, observacao)
VALUES ('123456', '87283928374', LAST_INSERT_ID(), 1, 1, '2025-08-14', '12:00:00', 'AGENDADA', 'Mesa janela');


-- Cliente 2
INSERT INTO clientes (nome, cpf, email, telefone) VALUES ('Bruno Souza', '73827384923', 'bruno@email.com', '31999990002');
INSERT INTO reservas (codigo_reserva, cpf, id_cliente, id_mesa, lugares, data_reserva, hora_reserva, status, observacao)
VALUES ('234567', '73827384923', LAST_INSERT_ID(), 14, 4, '2025-08-14', '13:30:00', 'AGENDADA', 'Mesa central');

-- Cliente 3
INSERT INTO clientes (nome, cpf, email, telefone) VALUES ('Carla Lima', '28372837483', 'carla@email.com', '31999990003');
INSERT INTO reservas (codigo_reserva, cpf, id_cliente, id_mesa, lugares, data_reserva, hora_reserva, status, observacao)
VALUES ('345678', '28372837483', LAST_INSERT_ID(), 4, 1, '2025-08-14', '15:00:00', 'AGENDADA', 'Mesa varanda');

-- Cliente 4
INSERT INTO clientes (nome, cpf, email, telefone) VALUES ('Diego Costa', '78652435237', 'diego@email.com', '31999990004');
INSERT INTO reservas (codigo_reserva, cpf, id_cliente, id_mesa, lugares, data_reserva, hora_reserva, status, observacao)
VALUES ('456789', '78652435237', LAST_INSERT_ID(), 9, 3, '2025-08-14', '16:45:00', 'AGENDADA', 'Mesa próxima ao bar');

-- Cliente 5
INSERT INTO clientes (nome, cpf, email, telefone) VALUES ('Elisa Ramos', '72837462938', 'elisa@email.com', '31999990005');
INSERT INTO reservas (codigo_reserva, cpf, id_cliente, id_mesa, lugares, data_reserva, hora_reserva, status, observacao)
VALUES ('567890', '72837462938', LAST_INSERT_ID(), 13, 2, '2025-08-14', '18:00:00', 'AGENDADA', 'Mesa canto');

-- Cliente 6
INSERT INTO clientes (nome, cpf, email, telefone) VALUES ('Felipe Martins', '72839283762', 'felipe@email.com', '31999990006');
INSERT INTO reservas (codigo_reserva, cpf, id_cliente, id_mesa, lugares, data_reserva, hora_reserva, status, observacao)
VALUES ('678901', '72839283762', LAST_INSERT_ID(), 18, 4, '2025-08-14', '19:30:00', 'AGENDADA', 'Mesa área externa');

