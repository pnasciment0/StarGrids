-- Category Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    categoryName VARCHAR(255)
);

-- Actor Table
CREATE TABLE actors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    headshot_url TEXT
);

-- Movie Table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

-- Category-Actor relationship (For Categories.answerPool)
CREATE TABLE category_actors (
    category_id INT REFERENCES categories(id),
    actor_id INT REFERENCES actors(id),
    PRIMARY KEY (category_id, actor_id)
);

-- Movie-Actor relationship (For Movies.cast)
CREATE TABLE movie_actors (
    movie_id INT REFERENCES movies(id),
    actor_id INT REFERENCES actors(id),
    PRIMARY KEY (movie_id, actor_id)
);

-- Actor-Movie relationship (For filmography)
CREATE TABLE actor_movies (
    actor_id INT REFERENCES actors(id),
    movie_id INT REFERENCES movies(id),
    PRIMARY KEY (actor_id, movie_id)
);

-- Cell Table
CREATE TABLE cells (
    id SERIAL PRIMARY KEY,
    numCorrectGuesses FLOAT,
    firstConstraint_type VARCHAR(50),
    firstConstraint_id INT,
    secondConstraint_type VARCHAR(50),
    secondConstraint_id INT
);

-- Cell-Actor relationship (For Cell.possibleAnswers)
CREATE TABLE cell_actors (
    cell_id INT REFERENCES cells(id),
    actor_id INT REFERENCES actors(id),
    numTimesActorIsGuessed FLOAT,
    PRIMARY KEY (cell_id, actor_id)
);

-- Puzzle Table
CREATE TABLE puzzles (
    id SERIAL PRIMARY KEY,
    is_active BOOLEAN
);

-- Puzzle-Cell relationship (For squares)
CREATE TABLE puzzle_cells (
    puzzle_id INT REFERENCES puzzles(id),
    cell_id INT REFERENCES cells(id),
    x_position INT,
    y_position INT,
    PRIMARY KEY (puzzle_id, cell_id, x_position, y_position)
);