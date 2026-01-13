"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCities = exports.saveFlight = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
let prisma = new client_1.PrismaClient();
// RapidAPI configuration
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "your-rapidapi-key";
const RAPIDAPI_HOST = "booking-com15.p.rapidapi.com";
async function fetchFromRapidAPI(url) {
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": RAPIDAPI_HOST,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`API request failed: ${error}`);
    }
}
let saveFlight = async function (req, res) {
    try {
        const { fromId, toId, departDate } = req.query;
        if (!fromId || !toId || !departDate) {
            return res.status(400).json({
                status: "error",
                message: "Missing required parameters: fromId, toId, departDate",
            });
        }
        console.log(`Fetching flights from ${fromId} to ${toId} on ${departDate}`);
        // Fetch cities
        const searchUrl = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${fromId}`;
        const destinationData = await fetchFromRapidAPI(searchUrl);
        if (!destinationData.status || !destinationData.data.length) {
            return res.status(404).json({
                status: "error",
                message: "No destinations found",
            });
        }
        const citiesMap = new Map();
        for (const dest of destinationData.data) {
            if (dest.type === "CITY" || dest.type === "AIRPORT") {
                const cityName = dest.cityName || dest.name;
                const country = dest.countryName;
                if (!citiesMap.has(cityName)) {
                    // Check if city already exists
                    let city = await prisma.city.findFirst({
                        where: {
                            name: cityName,
                            country: country,
                        },
                    });
                    if (!city) {
                        city = await prisma.city.create({
                            data: {
                                name: cityName,
                                country: country,
                            },
                        });
                        console.log(`Created city: ${cityName}, ${country}`);
                    }
                    citiesMap.set(cityName, city);
                }
            }
        }
        // Fetch flight data
        const flightUrl = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${departDate}`;
        const flightData = await fetchFromRapidAPI(flightUrl);
        if (!flightData.status || !flightData.data.flightOffers) {
            return res.status(404).json({
                status: "error",
                message: "No flights found",
            });
        }
        const savedFlights = [];
        for (const offer of flightData.data.flightOffers.slice(0, 10)) {
            const segment = offer.segments[0];
            if (!segment)
                continue;
            const departureCityName = segment.departureAirport.cityName;
            const city = citiesMap.get(departureCityName);
            if (!city) {
                console.log(`City not found for: ${departureCityName}`);
                continue;
            }
            // Get carrier info
            const carrier = segment.legs[0]?.carriersData[0];
            const flightName = carrier ? carrier.name : "Unknown";
            const flightLogo = carrier ? carrier.logo : "";
            const fare = offer.priceBreakdown.total.units +
                offer.priceBreakdown.total.nanos / 1000000000;
            // Check if flight already exists
            const existingFlight = await prisma.flight.findFirst({
                where: {
                    flightName: flightName,
                    departureAirport: segment.departureAirport.code,
                    arrivalAirport: segment.arrivalAirport.code,
                    departureTime: new Date(segment.departureTime),
                    arrivalTime: new Date(segment.arrivalTime),
                },
            });
            if (!existingFlight) {
                const flight = await prisma.flight.create({
                    data: {
                        flightName: flightName,
                        arrivalAirport: segment.arrivalAirport.code,
                        departureAirport: segment.departureAirport.code,
                        arrivalTime: new Date(segment.arrivalTime),
                        departureTime: new Date(segment.departureTime),
                        flightLogo: flightLogo,
                        fare: fare,
                        cityId: city.id,
                    },
                });
                savedFlights.push(flight);
                console.log(`Saved flight: ${flightName} - ${fare}`);
            }
        }
        return res.status(200).json({
            status: "success",
            message: `Successfully saved ${savedFlights.length} flights`,
            data: savedFlights,
        });
    }
    catch (e) {
        console.error("Error in saveFlight:", e);
        if (e instanceof Error) {
            return res.status(500).json({
                status: "error",
                message: "Failed to store flight data",
                error: e.message,
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                message: "Failed to store flight data",
                error: String(e),
            });
        }
    }
};
exports.saveFlight = saveFlight;
let saveCities = async function (req, res) {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                status: "error",
                message: "Missing required parameter: query",
            });
        }
        console.log(`Searching for cities with query: ${query}`);
        // Fetch destinations
        const searchUrl = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${query}`;
        const destinationData = await fetchFromRapidAPI(searchUrl);
        if (!destinationData.status || !destinationData.data.length) {
            return res.status(404).json({
                status: "error",
                message: "No destinations found",
            });
        }
        const savedCities = [];
        for (const dest of destinationData.data) {
            if (dest.type === "CITY" || dest.type === "AIRPORT") {
                const cityName = dest.cityName || dest.name;
                const country = dest.countryName;
                let city = await prisma.city.findFirst({
                    where: {
                        name: cityName,
                        country: country,
                    },
                });
                if (!city) {
                    city = await prisma.city.create({
                        data: {
                            name: cityName,
                            country: country,
                        },
                    });
                    savedCities.push(city);
                    console.log(`Created city: ${cityName}, ${country}`);
                }
            }
        }
        return res.status(200).json({
            status: "success",
            message: `Successfully saved ${savedCities.length} cities`,
            data: savedCities,
        });
    }
    catch (e) {
        console.error("Error in saveCities:", e);
        if (e instanceof Error) {
            return res.status(500).json({
                status: "error",
                message: "Failed to store city data",
                error: e.message,
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                message: "Failed to store city data",
                error: String(e),
            });
        }
    }
};
exports.saveCities = saveCities;
