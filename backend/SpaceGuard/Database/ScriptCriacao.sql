CREATE TABLE SATELITE (
                          ID NUMBER PRIMARY KEY,
                          NOME VARCHAR2(100) NOT NULL,
                          PAIS_ORIGEM VARCHAR2(100) NOT NULL,
                          DATA_LANCAMENTO DATE NOT NULL
);

CREATE TABLE INDICADOR_AMBIENTAL (
                                     ID NUMBER PRIMARY KEY,
                                     NOME VARCHAR2(100) NOT NULL,
                                     VALOR NUMBER(10,2) NOT NULL,
                                     DATA_LEITURA DATE NOT NULL,
                                     SATELITE_ID NUMBER NOT NULL,

                                     CONSTRAINT FK_INDICADOR_SATELITE
                                         FOREIGN KEY (SATELITE_ID)
                                             REFERENCES SATELITE(ID)
);

CREATE TABLE ALERTA_AMBIENTAL (
                                  ID NUMBER PRIMARY KEY,
                                  TITULO VARCHAR2(100) NOT NULL,
                                  DESCRICAO VARCHAR2(500) NOT NULL,
                                  NIVEL_RISCO VARCHAR2(50) NOT NULL,
                                  DATA_CRIACAO DATE NOT NULL,
                                  SATELITE_ID NUMBER NOT NULL,

                                  CONSTRAINT FK_ALERTA_SATELITE
                                      FOREIGN KEY (SATELITE_ID)
                                          REFERENCES SATELITE(ID)
);