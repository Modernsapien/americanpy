DROP TABLE IF EXISTS memories, user_countries, tokens, users, countries, rewards;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    profile_image_url VARCHAR,
    carbon_points INT DEFAULT 0
);

CREATE TABLE countries (
    country_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    description VARCHAR NOT NULL,
    eco_stat INT NOT NULL,
    image_url VARCHAR NOT NULL,
    attractions VARCHAR NOT NULL
);

CREATE TABLE rewards (
    
)

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token CHAR(36) NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id)
);
