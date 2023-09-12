"use strict";
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
exports.fetchMovieCreditsForPerson = exports.fetchPopularPeople = void 0;
const apiHelper_1 = require("./apiHelper");
const fetchPopularPeople = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, apiHelper_1.apiCall)({
            method: 'GET',
            url: '/person/popular'
        });
        return data.results
            .filter((person) => person.known_for_department === 'Acting')
            .map((person) => ({
            id: person.id,
            name: person.name,
            profile_path: person.profile_path
        }));
    }
    catch (err) {
        console.error('Failed to fetch popular people:', err);
        throw err;
    }
});
exports.fetchPopularPeople = fetchPopularPeople;
const fetchMovieCreditsForPerson = (personId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, apiHelper_1.apiCall)({
            method: 'GET',
            url: `/person/${personId}/movie_credits`,
        });
        // Transform data if needed
        return data.cast; // Assuming the API returns the data in a `cast` field
    }
    catch (err) {
        console.error(`Failed to fetch movie credits for person ${personId}:`, err);
        throw err;
    }
});
exports.fetchMovieCreditsForPerson = fetchMovieCreditsForPerson;
