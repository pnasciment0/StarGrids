-- database/migrations/001-initial-setup.sql

-- Actor table
CREATE TABLE Actor (
    actor_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255)
    -- movies FK will be created after Movie_Actor table is defined
);

-- Movie table
CREATE TABLE Movie (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    was_marvel BOOLEAN DEFAULT FALSE,
    was_nominated BOOLEAN DEFAULT FALSE
    -- intersections FK will be created after Movie_Actor table is defined
);

-- Criteria table
CREATE TABLE Criteria (
    criteria_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

-- Movie_Actor join table
CREATE TABLE Movie_Actor (
    movie_id INT REFERENCES Movie(movie_id),
    actor_id INT REFERENCES Actor(actor_id),
    rarity_score FLOAT DEFAULT 0.0,
    PRIMARY KEY (movie_id, actor_id)
);

-- TriviaPuzzle table
CREATE TABLE TriviaPuzzle (
    puzzle_id SERIAL PRIMARY KEY,
    aggregate_rarity FLOAT DEFAULT 0.0
    -- squares FK will be created after Square table is defined
);

-- Square table
CREATE TABLE Square (
    square_id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES Movie(movie_id),
    rarity_percentage FLOAT DEFAULT 0.0
);

-- Add Foreign Key for movies in Actor
ALTER TABLE Actor ADD COLUMN movies INT REFERENCES Movie_Actor(actor_id);

-- Add Foreign Key for intersections in Movie
ALTER TABLE Movie ADD COLUMN intersections INT REFERENCES Movie_Actor(movie_id);

-- Add Foreign Key for squares in TriviaPuzzle
ALTER TABLE TriviaPuzzle ADD COLUMN squares INT REFERENCES Square(square_id);

