// import all the packages
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
// import { prismaObj as prisma } from "../utils/prismaObj.utils";

let prisma = new PrismaClient() ;



let saveAttraction2 = async function (req: Request, res: Response): Promise<Response> {
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

    // Fetch attractions
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

    // Save attractions
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
      } catch (error) {
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

  } catch (e: unknown) {
    console.error("Error in saveAttraction:", e);
    if (e instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to store attraction data",
        error: e.message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Failed to store attraction data",
        error: String(e),
      });
    }
  }
};

export {saveAttraction2}

// GET /save-attraction?cityName=Mumbai&country=India