// types.ts

// Category Table
export interface Category {
    id: number;
    categoryName: string;
  }
  
  // Actor Table
  export interface Actor {
    id: number;
    name: string;
    headshot_url: string;
  }
  
  // Movie Table
  export interface Movie {
    id: number;
    name: string;
    poster_url: string;
  }
  
  // Category-Actor Relationship
  export interface CategoryActor {
    category_id: number;
    actor_id: number;
  }
  
  // Movie-Actor Relationship
  export interface MovieActor {
    movie_id: number;
    actor_id: number;
  }
  
  // Actor-Movie Relationship
  export interface ActorMovie {
    actor_id: number;
    movie_id: number;
  }
  
  // Cell Table
  export interface Cell {
    id: number;
    numCorrectGuesses: number;
    firstConstraint_type: string;
    firstConstraint_id: number;
    secondConstraint_type: string;
    secondConstraint_id: number;
  }
  
  // Cell-Actor Relationship
  export interface CellActor {
    cell_id: number;
    actor_id: number;
    numTimesActorIsGuessed: number;
  }
  
  // Puzzle Table
  export interface Puzzle {
    id: number;
    is_active: boolean;
  }
  
  // Puzzle-Cell Relationship
  export interface PuzzleCell {
    puzzle_id: number;
    cell_id: number;
    x_position: number;
    y_position: number;
  }
  