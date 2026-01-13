"use strict";
// import all the modules and packages 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myServer = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const saveData_router_1 = require("./router/saveData.router");
const findData_router_1 = require("./router/findData.router");
// main code 
let app = (0, express_1.default)();
let myServer = (0, http_1.createServer)(app);
exports.myServer = myServer;
// connection with server 
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use("/save", saveData_router_1.saveRouter);
app.use(findData_router_1.findRouter);
// req-res-cycle 
app.get("/", function (req, res) {
    return res.status(200).json({
        status: 200,
        messgae: "Home Page"
    });
});
// error handling 
app.use(function (req, res, next) {
    return res.status(404).json({
        status: 404,
        message: "Page not found !"
    });
});
app.use(function (err, req, res, next) {
    if (err instanceof Error) {
        return res.status(500).json({
            status: 500,
            messgae: "Find server error !",
            error: err.message
        });
    }
    else {
        return res.status(500).json({
            status: 500,
            messgae: "Find server error !",
            error: err
        });
    }
});
