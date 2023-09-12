"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// Read data.json file
const rawData = fs.readFileSync('./data.json', 'utf-8');
const data = JSON.parse(rawData);
const { actors, movies } = data;
const db_1 = require("../database/db"); // import from your db.ts
const addDataToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.connectDB)(); // Assumes your connectDB() is exported
    // Begin transaction
    yield db.query('BEGIN');
    try {
        // Add actors
        const actorPromises = actors.map((actor) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, name, headshot_url } = actor;
            return (0, db_1.createRecord)('actors', {
                id,
                name,
                headshot_url,
            });
        }));
        // Add movies
        const moviePromises = movies.map((movie) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, name, poster_url } = movie;
            return (0, db_1.createRecord)('movies', {
                id,
                name,
                poster_url
            });
        }));
        // Wait for all actors and movies to be added
        yield Promise.all([...actorPromises, ...moviePromises]);
        // Add relationships for movies and actors
        for (const movie of movies) {
            for (const actorId of movie.cast) {
                yield (0, db_1.createRecord)('movie_actors', {
                    movie_id: movie.id,
                    actor_id: actorId,
                });
                yield (0, db_1.createRecord)('actor_movies', {
                    actor_id: actorId,
                    movie_id: movie.id,
                });
            }
        }
        // Commit transaction
        yield db.query('COMMIT');
    }
    catch (e) {
        console.error('Transaction failed, rolling back', e);
        // Rollback transaction
        yield db.query('ROLLBACK');
    }
});
// Execute the function
addDataToDB().catch((err) => console.error(err));
