"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAttraction2 = void 0;
const client_1 = require("@prisma/client");
// import { prismaObj as prisma } from "../utils/prismaObj.utils";
let prisma = new client_1.PrismaClient();
let saveAttraction2 = async function (req, res) {
    try {
        const { cityName, country } = req.query;
        // Validate required parameters
        if (!cityName || !country) {
            return res.status(400).json({
                status: "error",
                message: "Missing required parameters: cityName, country",
            });
        }
        console.log(`Fetching attractions for ${cityName}, ${country}`);
        // Step 1: Find or create city
        let city = await prisma.city.findFirst({
            where: {
                name: String(cityName),
                country: String(country),
            },
        });
        if (!city) {
            city = await prisma.city.create({
                data: {
                    name: String(cityName),
                    country: String(country),
                },
            });
            console.log(`Created city: ${cityName}, ${country}`);
        }
        // Step 2: Fetch attractions from Booking.com API
        const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${cityName}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'fd6671bc3bmshd44a28e6f3fcafbp1cdb1bjsne5611b34b335',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const attractionData = await response.json();
        // Check if API call was successful
        if (!attractionData.status || !attractionData.data || !attractionData.data.products) {
            return res.status(404).json({
                status: "error",
                message: "No attractions found for this city",
            });
        }
        const savedAttractions = [];
        const products = attractionData.data.products;
        // Step 3: Save attractions to database
        for (const product of products) {
            try {
                // Check if attraction already exists
                const existingAttraction = await prisma.attraction.findUnique({
                    where: {
                        attractionSlug: product.productSlug,
                    },
                });
                if (existingAttraction) {
                    console.log(`Attraction already exists: ${product.title}`);
                    continue;
                }
                // Create new attraction
                const attraction = await prisma.attraction.create({
                    data: {
                        attractionName: product.title,
                        attractionSlug: product.productSlug,
                        additionalInfo: `Product ID: ${product.productId}, Taxonomy: ${product.taxonomySlug}`,
                        cancellationPolicy: null, // Not provided in this API response
                        images: product.productId, // Storing productId as reference, you can store image URLs if available
                        price: 0, // Price not provided in this endpoint, you may need another API call
                        whatsIncludes: null, // Not provided in this API response
                        country: product.countryCode.toUpperCase(),
                        cityName: product.cityName,
                        cityId: city.id,
                    },
                });
                savedAttractions.push(attraction);
                console.log(`Saved attraction: ${product.title}`);
            }
            catch (error) {
                console.error(`Failed to save attraction: ${product.title}`, error);
                // Continue with next attraction
            }
        }
        return res.status(200).json({
            status: "success",
            message: `Successfully saved ${savedAttractions.length} attractions out of ${products.length} total`,
            data: {
                city: city,
                attractions: savedAttractions,
                total: savedAttractions.length,
            },
        });
    }
    catch (e) {
        console.error("Error in saveAttraction:", e);
        if (e instanceof Error) {
            return res.status(500).json({
                status: "error",
                message: "Failed to store attraction data",
                error: e.message,
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                message: "Failed to store attraction data",
                error: String(e),
            });
        }
    }
};
exports.saveAttraction2 = saveAttraction2;
// GET /save-attraction?cityName=Mumbai&country=India
