CREATE DATABASE IF NOT EXISTS raiz_mineira;
USE raiz_mineira;

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
