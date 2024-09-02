\c "snapMsg"

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.message (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text VARCHAR NOT NULL
);
