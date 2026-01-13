"use strict";
// import all the packages 
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetails = exports.getSearch = void 0;
const client_1 = require("@prisma/client");
// main code 
let prisma = new client_1.PrismaClient();
let getSearch = async function (req, res) {
    try {
        const { location } = req.params;
        const cityName = Array.isArray(location) ? location[0] : location;
        if (!cityName) {
            return res.status(400).json({
                error: "City name is required"
            });
        }
        const city = await prisma.city.findFirst({
            where: {
                name: {
                    equals: cityName,
                    mode: 'insensitive' // Case-insensitive search
                }
            },
            include: {
                flights: true,
                attractions: true,
            },
        });
        if (!city) {
            return res.status(404).json({
                error: "City not found"
            });
        }
        res.json(city);
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({
                status: "error",
                message: "Find error to store data",
                error: e.message
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                message: "Find error to store data",
                error: e
            });
        }
    }
};
exports.getSearch = getSearch;
// get data using id and search type 
let getDetails = async function (req, res) {
    try {
        let id_ = Number(req.params.id);
        let searchType = req.query.searchtype;
        let result, city_;
        if (searchType !== "flight" && searchType !== "attraction") {
            return res.status(400).json({
                status: "false",
                message: "Search type should be Flight or Attraction"
            });
        }
        if (searchType === "flight") {
            result = await prisma.flight.findUnique({
                where: {
                    id: id_
                }
            });
        }
        else {
            result = await prisma.attraction.findUnique({
                where: {
                    id: id_
                }
            });
        }
        if (result) {
            city_ = await prisma.city.findUnique({
                where: {
                    id: result.cityId
                }
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Data successfully fetched",
            data: {
                geoId: {
                    city: city_
                },
                Information: result
            }
        });
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({
                status: "error",
                message: "Find error to store data",
                error: e.message
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                message: "Find error to store data",
                error: e
            });
        }
    }
};
exports.getDetails = getDetails;
