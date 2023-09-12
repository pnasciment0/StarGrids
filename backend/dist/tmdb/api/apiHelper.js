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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCall = void 0;
require('dotenv').config({ path: '../.env' });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const apiCall = ({ method, url, params, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerToken = process.env.TMDB_BEARER_TOKEN;
    const options = {
        method,
        url: `${config_1.default.tmdb.baseUrl}${url}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json'
        },
        params: Object.assign({ language: 'en-US', page: 1 }, params),
        data
    };
    const response = yield (0, axios_1.default)(options);
    return response.data;
});
exports.apiCall = apiCall;
