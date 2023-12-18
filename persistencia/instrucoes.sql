CREATE DATABASE sistema;

USE sistema;

CREATE TABLE categoria(
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto(
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    cat_codigo INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
    CONSTRAINT fk_categoria FOREIGN KEY(cat_codigo) REFERENCES categoria(cat_codigo) ON DELETE CASCADE
);

CREATE TABLE cliente(
    cli_cpf VARCHAR(15) NOT NULL,
    cli_nome VARCHAR(50) NOT NULL,
    cli_endereco VARCHAR(50) NOT NULL,
    cli_numero VARCHAR(50) NOT NULL,
    cli_bairro VARCHAR(50) NOT NULL,
    cli_cidade VARCHAR(50) NOT NULL,
    cli_uf VARCHAR(2) NOT NULL,
    cli_cep VARCHAR(30) NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cli_cpf)
);

CREATE TABLE fornecedor(
    forn_cnpj VARCHAR(20) NOT NULL,
    forn_nome VARCHAR(50) NOT NULL,
    forn_endereco VARCHAR(50) NOT NULL,
    forn_bairro VARCHAR(50) NOT NULL,
    forn_cidade VARCHAR(50) NOT NULL,
    forn_uf VARCHAR(2) NOT NULL,
    forn_cep VARCHAR(30) NOT NULL,
    CONSTRAINT pk_fornecedor PRIMARY KEY(forn_cnpj)
);

CREATE TABLE fornecedor_produto (
    forn_cnpj VARCHAR(20) NOT NULL,
    prod_codigo INT NOT NULL,
    CONSTRAINT pk_fornecedor_produto PRIMARY KEY (forn_cnpj, prod_codigo),
    CONSTRAINT fk_fornprod_produto FOREIGN KEY (prod_codigo) REFERENCES produto (prod_codigo) ON DELETE CASCADE,
    CONSTRAINT fk_fornprod_fornecedor FOREIGN KEY (forn_cnpj) REFERENCES fornecedor (forn_cnpj) ON DELETE CASCADE
);

INSERT INTO categoria (cat_descricao) VALUES
('Camisetas'),
('Calças'),
('Vestidos'),
('Sapatos'),
('Acessórios');

-- Inserir produtos (roupas) relacionados às categorias
INSERT INTO produto (prod_descricao, prod_precoCusto, prod_precoVenda, prod_qtdEstoque, cat_codigo) VALUES
('Camiseta Casual', 20.00, 39.99, 100, 1),
('Calça Jeans Slim', 35.00, 69.99, 80, 2),
('Vestido Floral', 45.00, 89.99, 50, 3),
('Sapato Social', 30.00, 59.99, 60, 4),
('Colar Fashion', 15.00, 29.99, 120, 5);

-- Inserir clientes
INSERT INTO cliente (cli_cpf, cli_nome, cli_endereco, cli_numero, cli_bairro, cli_cidade, cli_uf, cli_cep) VALUES
('123.456.789-01', 'Maria Silva', 'Rua A', '123', 'Centro', 'Cidade A', 'SP', '12345-678'),
('987.654.321-01', 'João Oliveira', 'Rua B', '456', 'Bairro X', 'Cidade B', 'BA', '54321-876');

-- Inserir fornecedores
INSERT INTO fornecedor (forn_cnpj, forn_nome, forn_endereco, forn_bairro, forn_cidade, forn_uf, forn_cep) VALUES
('00.123.456/0001-01', 'Fornecedor A', 'Rua Fornecedor A', 'Bairro F', 'Cidade F', 'RJ', '12345-678'),
('11.987.654/0001-01', 'Fornecedor B', 'Rua Fornecedor B', 'Bairro G', 'Cidade G', 'PR', '54321-876');

-- Inserir relação entre fornecedores e produtos
INSERT INTO fornecedor_produto (forn_cnpj, prod_codigo) VALUES
('00.123.456/0001-01', 1),
('00.123.456/0001-01', 2),
('11.987.654/0001-01', 3),
('11.987.654/0001-01', 4),
('11.987.654/0001-01', 5);