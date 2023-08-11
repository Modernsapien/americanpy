DROP TABLE IF EXISTS rewards;

CREATE TABLE rewards (
    reward_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    points_required INT 
);