"use strict";
// import all the packages 
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaObj = void 0;
const client_1 = require("@prisma/client");
// main code 
let prismaObj = new client_1.PrismaClient();
exports.prismaObj = prismaObj;
