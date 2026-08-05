-- V2__create_usuarios_table.sql
-- Tabla de usuarios: para registro/login y estadisticas por edad/zona

CREATE TABLE usuarios (
    id               BIGSERIAL PRIMARY KEY,
    nombre_usuario   VARCHAR(50) NOT NULL UNIQUE,
    contrasena_hash  VARCHAR(255) NOT NULL,
    edad             INTEGER,
    zona             VARCHAR(100),
    created_at       TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_usuarios_zona ON usuarios(zona);