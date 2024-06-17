CREATE DATABASE sistema;
USE sistema;

CREATE TABLE usuarios(
	id INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(30),
	nome VARCHAR(30), 
    cpf VARCHAR(30), 
    email VARCHAR(30),
    telefone VARCHAR(30),
    PRIMARY KEY(id)
);

INSERT INTO usuarios(nome) VALUES("Bruno");
INSERT INTO usuarios(nome) VALUES("Luiz");

SELECT * FROM usuarios;

CREATE TABLE ocorrencias(
	id INT NOT NULL AUTO_INCREMENT,
    usuario INT NOT NULL,
    titulo VARCHAR(100),
    descricao VARCHAR(300),
    tipo VARCHAR(30),
    latitude DOUBLE,
    longitude DOUBLE,
    dataHora DATETIME,
    statusAndamento VARCHAR(30),
    observacao VARCHAR(300),
    endereco VARCHAR(300),
    PRIMARY KEY(id),
    FOREIGN KEY(usuario) REFERENCES usuarios(id)
);

INSERT INTO ocorrencias(usuario,titulo,descricao,tipo,latitude,longitude,dataHora,statusAndamento)VALUES
(1,"Primeira ocorrência", "Essa é a primeira ocorrência","asfaltoCalcada","-30.035116424888752","-51.22658856554252","2023-01-11 20:00:00","aberto"),
(2,"Ocorrência", "Essa é uma ocorrência de um usuário diferente","asfaltoCalcada","-30.035219554093047","-51.226684350288835","2023-01-11 20:00:00","aberto");
SELECT * FROM ocorrencias;


DELETE from ocorrencias WHERE id > 3;
DROP DATABASE sistema;
DROP TABLE ocorrencias;
UPDATE ocorrencias SET observacao = "Chamado foi aberto para teste" WHERE id = 1;
UPDATE ocorrencias SET statusAndamento = "aberto" WHERE id > 0;
UPDATE ocorrencias SET usuario = 2 WHERE id = 2;


INSERT INTO ocorrencias(usuario,titulo,descricao,tipo,latitude,longitude,dataHora,statusAndamento)VALUES
(1, "Ocorrência 1 ", "Descrição da ocorrência 1" , "asfaltoCalcada", -30.0274, -51.2284, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 2 ", "Descrição da ocorrência 2" , "asfaltoCalcada", -30.0291, -51.2307, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 3 ", "Descrição da ocorrência 3" , "asfaltoCalcada", -30.0308, -51.2293, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 4 ", "Descrição da ocorrência 4" , "asfaltoCalcada", -30.0315, -51.2320, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 5 ", "Descrição da ocorrência 5" , "asfaltoCalcada", -30.0293, -51.2265, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 6 ", "Descrição da ocorrência 6" , "asfaltoCalcada", -30.0321, -51.2334, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 7 ", "Descrição da ocorrência 7" , "asfaltoCalcada", -30.0284, -51.2311, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 8 ", "Descrição da ocorrência 8" , "asfaltoCalcada", -30.0267, -51.2300, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 9 ", "Descrição da ocorrência 9" , "asfaltoCalcada", -30.0300, -51.2279, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 10", "Descrição da ocorrência 10", "asfaltoCalcada", -30.0310, -51.2295, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 11", "Descrição da ocorrência 11", "asfaltoCalcada", -30.0299, -51.2280, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 12", "Descrição da ocorrência 12", "asfaltoCalcada", -30.0280, -51.2270, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 13", "Descrição da ocorrência 13", "asfaltoCalcada", -30.0305, -51.2321, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 14", "Descrição da ocorrência 14", "asfaltoCalcada", -30.0318, -51.2337, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 15", "Descrição da ocorrência 15", "asfaltoCalcada", -30.0273, -51.2268, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 16", "Descrição da ocorrência 16", "asfaltoCalcada", -30.0289, -51.2282, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 17", "Descrição da ocorrência 17", "asfaltoCalcada", -30.0307, -51.2298, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 18", "Descrição da ocorrência 18", "asfaltoCalcada", -30.0322, -51.2315, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 19", "Descrição da ocorrência 19", "asfaltoCalcada", -30.0290, -51.2274, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 20", "Descrição da ocorrência 20", "asfaltoCalcada", -30.0271, -51.2257, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 21", "Descrição da ocorrência 21", "asfaltoCalcada", -30.0288, -51.2285, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 22", "Descrição da ocorrência 22", "asfaltoCalcada", -30.0303, -51.2309, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 23", "Descrição da ocorrência 23", "asfaltoCalcada", -30.0312, -51.2326, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 24", "Descrição da ocorrência 24", "asfaltoCalcada", -30.0291, -51.2266, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 25", "Descrição da ocorrência 25", "asfaltoCalcada", -30.0272, -51.2259, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 26", "Descrição da ocorrência 26", "asfaltoCalcada", -30.0289, -51.2273, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 27", "Descrição da ocorrência 27", "asfaltoCalcada", -30.0302, -51.2297, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 28", "Descrição da ocorrência 28", "asfaltoCalcada", -30.0316, -51.2314, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 29", "Descrição da ocorrência 29", "asfaltoCalcada", -30.0283, -51.2262, "2023-01-11 20:00:00", "aberto"),
(1, "Ocorrência 30", "Descrição da ocorrência 30", "asfaltoCalcada", -30.0304, -51.2304, "2023-01-11 20:00:00", "aberto");
