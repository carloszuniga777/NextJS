
CREATE TABLE tigo.tbl_boc_logins (
    id SERIAL PRIMARY KEY,
    usuario TEXT NOT NULL,
    tipo_usuario TEXT,
    territorio TEXT,
    correo TEXT NOT NULL,
    observacion TEXT,
    log TEXT,
    fecha_log TIMESTAMP,
    pass TEXT NOT NULL
);
