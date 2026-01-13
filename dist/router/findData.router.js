"use strict";
// import all the packages 
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRouter = void 0;
const express_1 = require("express");
const findData_controller_1 = require("../controller/findData.controller");
// main code 
let findRouter = (0, express_1.Router)();
exports.findRouter = findRouter;
findRouter.get("/search/:location", findData_controller_1.getSearch);
findRouter.get("/details/:id", findData_controller_1.getDetails);
