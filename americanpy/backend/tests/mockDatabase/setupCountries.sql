DROP TABLE IF EXISTS users, countries, rewards, memories, users_countries, tokens;

CREATE TABLE countries (
    country_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    description VARCHAR NOT NULL,
    eco_stat INT,
    image_url VARCHAR,
    attractions VARCHAR
);