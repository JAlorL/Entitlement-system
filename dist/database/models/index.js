"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initDB_1 = __importDefault(require("../initDB"));
const user_1 = __importDefault(require("./user"));
const dataset_1 = __importDefault(require("./dataset"));
const request_1 = __importDefault(require("./request"));
const notification_1 = __importDefault(require("./notification"));
const access_1 = __importDefault(require("./access"));
// Import and initialize models
const models = [user_1.default, dataset_1.default, request_1.default, notification_1.default, access_1.default];
models.forEach((model) => {
    model.sync(); // Ensure each model is synchronized with the database
});
exports.default = initDB_1.default;
