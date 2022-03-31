-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS pizzas;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS states;

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    star TEXT NOT NULL,
    years INT
);
CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    breed TEXT NOT NULL,
    named TEXT NOT NULL,
    age INT
);
CREATE TABLE countries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    named TEXT NOT NULL,
    borders TEXT NOT NULL,
    founded INT
);
CREATE TABLE pizzas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    named TEXT NOT NULL,
    crust TEXT NOT NULL,
    toppings INT
);

CREATE TABLE states (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 named TEXT NOT NULL,
 weather TEXT NOT NULL,
 statenumber INT
);

INSERT INTO
    movies (title, star, years)
  

VALUES
    ('Training Day', 'Denzel Washington', '2004'),
    ('Man on Fire', 'Denzel Washington', '2001');

INSERT INTO
    dogs (breed, named, age)

VALUES
    ('newfoundland', 'Chelsea','12'),
    ('lab', 'Bailey', '10');

INSERT INTO
    countries (named, borders, founded)

VALUES
    ('Nicaragua', 'Costa Rica', '1821'),
    ('Poland', 'Germany', '1919');

INSERT INTO
    pizzas (named, crust, toppings )

VALUES
    ('Detroit Style', 'Thick', '4'),
    ('Chicago Style', 'Thick', '2');

INSERT INTO  
    states (named, weather, statenumber)

VALUES
    ('New Michigan', 'Bleak', '5111'),
    ('New Alaska', 'Awesome', '52');
