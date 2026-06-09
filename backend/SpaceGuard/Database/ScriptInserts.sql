INSERT INTO SATELITE (
    ID,
    NOME,
    PAIS_ORIGEM,
    DATA_LANCAMENTO
)
VALUES (
           1,
           'CBERS-4A',
           'Brasil/China',
           DATE '2020-12-20'
       );

INSERT INTO INDICADOR_AMBIENTAL (
    ID,
    NOME,
    VALOR,
    DATA_LEITURA,
    SATELITE_ID
)
VALUES (
           1,
           'Temperatura Global',
           29.50,
           SYSDATE,
           1
       );

INSERT INTO ALERTA_AMBIENTAL (
    ID,
    TITULO,
    DESCRICAO,
    NIVEL_RISCO,
    DATA_CRIACAO,
    SATELITE_ID
)
VALUES (
           1,
           'Risco de Queimada',
           'Possivel foco de calor detectado',
           'ALTO',
           SYSDATE,
           1
       );

COMMIT;