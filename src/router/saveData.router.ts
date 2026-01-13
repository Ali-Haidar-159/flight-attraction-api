import express from "express";
import {saveCities, saveFlight } from "../controller/saveFlights.controller";
import { saveAttraction2 } from "../controller/saveAttraction.controller";

const saveRouter = express.Router();

// Route to save cities
// http://localhost:3000/save/save-cities?query=new
saveRouter.get("/save-cities", saveCities);

// Route to save flights
// http://localhost:3000/save/save-flight?fromId=BOM.AIRPORT&toId=DEL.AIRPORT&departDate=2026-01-15
saveRouter.get("/save-flight", saveFlight); 


// Route to save attractions
// http://localhost:3000/save/save-attraction?cityName=Mumbai&country=India
saveRouter.get("/save-attraction", saveAttraction2);

// export code 

export  {saveRouter};