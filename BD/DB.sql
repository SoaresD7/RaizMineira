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

-- ========================================
-- Procedures
-- ========================================

DELIMITER $$

-- Atualizar total do pedido
CREATE PROCEDURE atualizar_total_pedido(IN pid INT)
BEGIN
    DECLARE valor_total DECIMAL(10,2);
    SELECT SUM(quantidade * preco_unitario)
    INTO valor_total
    FROM itens_pedido
    WHERE id_pedido = pid;

    UPDATE pedidos
    SET total = IFNULL(valor_total, 0.00)
    WHERE id = pid;
END $$

-- Fechar comanda
CREATE PROCEDURE fechar_comanda(IN comanda_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE pid INT;
    DECLARE cur CURSOR FOR SELECT id FROM pedidos WHERE id_comanda = comanda_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO pid;
        IF done THEN
            LEAVE read_loop;
        END IF;
        CALL atualizar_total_pedido(pid);
        UPDATE pedidos
        SET status = IF(status = 'EM_PREPARO', 'ENTREGUE', status)
        WHERE id = pid;
    END LOOP;
    CLOSE cur;

    UPDATE comandas
    SET status = 'FECHADA',
        data_fechamento = NOW()
    WHERE id = comanda_id;
END $$

-- Abrir comanda
CREATE PROCEDURE abrir_comanda(IN mesa_numero INT, OUT nova_comanda_id INT)
BEGIN
    DECLARE mesa_id INT;
    SELECT id INTO mesa_id FROM mesas WHERE numero = mesa_numero LIMIT 1;
    IF mesa_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mesa não encontrada';
    END IF;
    INSERT INTO comandas (id_mesa) VALUES (mesa_id);
    SET nova_comanda_id = LAST_INSERT_ID();
    UPDATE mesas SET status = 'OCUPADA' WHERE id = mesa_id;
END $$

-- Relatório: Vendas por dia
CREATE PROCEDURE relatorio_vendas_por_dia()
BEGIN
    SELECT DATE(data_pedido) AS dia, 
           COUNT(*) AS total_pedidos,
           SUM(total) AS total_vendido
    FROM pedidos
    GROUP BY dia
    ORDER BY dia DESC;
END $$

-- Relatório: Vendas por tipo
CREATE PROCEDURE relatorio_vendas_por_tipo()
BEGIN
    SELECT c.tipo,
           SUM(ip.quantidade) AS total_itens,
           SUM(ip.quantidade * ip.preco_unitario) AS total_vendido
    FROM itens_pedido ip
    JOIN cardapio c ON c.id = ip.id_produto
    GROUP BY c.tipo
    ORDER BY total_vendido DESC;
END $$

DELIMITER ;

-- ========================================
-- Triggers
-- ========================================

DELIMITER $$

CREATE TRIGGER trg_after_item_insert
AFTER INSERT ON itens_pedido
FOR EACH ROW
BEGIN
    CALL atualizar_total_pedido(NEW.id_pedido);
END $$

CREATE TRIGGER trg_after_item_update
AFTER UPDATE ON itens_pedido
FOR EACH ROW
BEGIN
    CALL atualizar_total_pedido(NEW.id_pedido);
END $$

CREATE TRIGGER trg_after_item_delete
AFTER DELETE ON itens_pedido
FOR EACH ROW
BEGIN
    CALL atualizar_total_pedido(OLD.id_pedido);
END $$

DELIMITER ;
-- ========================================