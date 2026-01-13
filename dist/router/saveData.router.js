"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRouter = void 0;
const express_1 = __importDefault(require("express"));
const saveFlights_controller_1 = require("../controller/saveFlights.controller");
const saveAttraction_controller_1 = require("../controller/saveAttraction.controller");
const saveRouter = express_1.default.Router();
exports.saveRouter = saveRouter;
// Route to save cities
// http://localhost:3000/save/save-cities?query=new
saveRouter.get("/save-cities", saveFlights_controller_1.saveCities);
// Route to save flights
// http://localhost:3000/save/save-flight?fromId=BOM.AIRPORT&toId=DEL.AIRPORT&departDate=2026-01-15
saveRouter.get("/save-flight", saveFlights_controller_1.saveFlight);
// Route to save attractions
// http://localhost:3000/save/save-attraction?cityName=Mumbai&country=India
saveRouter.get("/save-attraction", saveAttraction_controller_1.saveAttraction2);
