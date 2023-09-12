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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphqlSchema_1 = __importDefault(require("../graphql/graphqlSchema"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const query = `
  {
    popularPeople {
      id
      name
      profile_path
      filmography {
        id
        title
        poster_path
      }
    }
  }
`;
const executeQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.time('GraphQL Query Execution Time');
        const result = yield (0, graphql_1.graphql)({
            schema: graphqlSchema_1.default,
            source: query,
        });
        if (process.argv.length >= 3) {
            const filePath = path.join(__dirname, 'data.json'); // Defining path for the JSON file
            fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                }
                else {
                    console.log(`Results written to ${filePath}`);
                }
            });
        }
        else {
            console.log(JSON.stringify(result, null, 2));
        }
        console.timeEnd('GraphQL Query Execution Time');
    }
    catch (error) {
        console.timeEnd('GraphQL Query Execution Time');
        console.error('Error executing query:', error);
    }
});
executeQuery();
