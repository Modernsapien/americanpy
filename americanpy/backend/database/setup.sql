DROP TABLE IF EXISTS users, countries, rewards, memories, users_countries, tokens CASCADE;

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
    eco_stat INT,
    image_url VARCHAR,
    attractions VARCHAR
);

CREATE TABLE rewards (
    reward_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    points_required INT NOT NULL DEFAULT 10
);

CREATE TABLE memories (
    memory_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    country_id INT REFERENCES countries(country_id),
    memory_name VARCHAR(200),
    memory_date VARCHAR(10),
    memory_location VARCHAR(100),
    memory_description VARCHAR(2000),
    drive_link VARCHAR(2000)
);

CREATE TABLE users_countries (
    users_countries_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    country_id INT NOT NULL REFERENCES countries(country_id) 
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token CHAR(36) NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id)
);

INSERT INTO rewards (name, description, points_required)
VALUES
    ('reward1', 'reward1', 5),
    ('reward2', 'reward2', 10 ),
    ('reward3', 'reward3', 20 );
