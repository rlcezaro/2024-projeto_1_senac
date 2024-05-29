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
    PRIMARY KEY(id),
    FOREIGN KEY(usuario) REFERENCES usuarios(id)
);

INSERT INTO ocorrencias(usuario,titulo,descricao,tipo,latitude,longitude,dataHora,statusAndamento)VALUES
(1,"Primeira ocorrência", "Essa é a primeira ocorrência","asfaltoCalcada","-30.035116424888752","-51.22658856554252","2003-04-11 20:00:00","aberto"),
(2,"Ocorrência", "Essa é uma ocorrência de um usuário diferente","asfaltoCalcada","-30.035219554093047","-51.226684350288835","2003-04-11 20:00:00","aberto");
SELECT * FROM ocorrencias;


DELETE from ocorrencias WHERE id > 0;
-- DROP DATABASE SISTEMA;
DROP TABLE ocorrencias;
UPDATE ocorrencias SET observacao = "Chamado foi aberto para teste" WHERE id = 1;
UPDATE ocorrencias SET statusAndamento = "aberto" WHERE id > 0;
UPDATE ocorrencias SET usuario = 2 WHERE id = 2;


INSERT INTO ocorrencias(usuario, titulo, descricao, latitude, longitude) VALUES 
(1, "Ocorrência 1", "Descrição da ocorrência 1", -30.0274, -51.2284),
(1, "Ocorrência 2", "Descrição da ocorrência 2", -30.0291, -51.2307),
(1, "Ocorrência 3", "Descrição da ocorrência 3", -30.0308, -51.2293),
(1, "Ocorrência 4", "Descrição da ocorrência 4", -30.0315, -51.2320),
(1, "Ocorrência 5", "Descrição da ocorrência 5", -30.0293, -51.2265),
(1, "Ocorrência 6", "Descrição da ocorrência 6", -30.0321, -51.2334),
(1, "Ocorrência 7", "Descrição da ocorrência 7", -30.0284, -51.2311),
(1, "Ocorrência 8", "Descrição da ocorrência 8", -30.0267, -51.2300),
(1, "Ocorrência 9", "Descrição da ocorrência 9", -30.0300, -51.2279),
(1, "Ocorrência 10", "Descrição da ocorrência 10", -30.0310, -51.2295),
(1, "Ocorrência 11", "Descrição da ocorrência 11", -30.0299, -51.2280),
(1, "Ocorrência 12", "Descrição da ocorrência 12", -30.0280, -51.2270),
(1, "Ocorrência 13", "Descrição da ocorrência 13", -30.0305, -51.2321),
(1, "Ocorrência 14", "Descrição da ocorrência 14", -30.0318, -51.2337),
(1, "Ocorrência 15", "Descrição da ocorrência 15", -30.0273, -51.2268),
(1, "Ocorrência 16", "Descrição da ocorrência 16", -30.0289, -51.2282),
(1, "Ocorrência 17", "Descrição da ocorrência 17", -30.0307, -51.2298),
(1, "Ocorrência 18", "Descrição da ocorrência 18", -30.0322, -51.2315),
(1, "Ocorrência 19", "Descrição da ocorrência 19", -30.0290, -51.2274),
(1, "Ocorrência 20", "Descrição da ocorrência 20", -30.0271, -51.2257),
(1, "Ocorrência 21", "Descrição da ocorrência 21", -30.0288, -51.2285),
(1, "Ocorrência 22", "Descrição da ocorrência 22", -30.0303, -51.2309),
(1, "Ocorrência 23", "Descrição da ocorrência 23", -30.0312, -51.2326),
(1, "Ocorrência 24", "Descrição da ocorrência 24", -30.0291, -51.2266),
(1, "Ocorrência 25", "Descrição da ocorrência 25", -30.0272, -51.2259),
(1, "Ocorrência 26", "Descrição da ocorrência 26", -30.0289, -51.2273),
(1, "Ocorrência 27", "Descrição da ocorrência 27", -30.0302, -51.2297),
(1, "Ocorrência 28", "Descrição da ocorrência 28", -30.0316, -51.2314),
(1, "Ocorrência 29", "Descrição da ocorrência 29", -30.0283, -51.2262),
(1, "Ocorrência 30", "Descrição da ocorrência 30", -30.0304, -51.2304);
