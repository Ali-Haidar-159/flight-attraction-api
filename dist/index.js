"use strict";
// import all the modules and packages 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const chalk_1 = __importDefault(require("chalk"));
const app_1 = require("./app");
// main code 
let PORT = process.env.PORT || 5000;
let designConsole = chalk_1.default.bgRed.bold;
app_1.myServer.listen(PORT, function () {
    console.log(designConsole(`Server is running at http://localhost:${PORT} ...`));
});
