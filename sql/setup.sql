-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    star TEXT NOT NULL,
    years BIGINT
)

INSERT INTO
    movies (title, star, years)

VALUES
    ('Training Day', 'Denzel Washington', '2004'),
    ('Man on Fire', 'Denzel Washington', '2001');