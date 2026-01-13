// import all the packages 

import { PrismaClient } from "@prisma/client";
import {Request,Response} from "express" ;

// main code 

let prisma = new PrismaClient() ;

let getSearch = async function(req:Request , res:Response){

        try
    {

const {location} = req.params;
const cityName = Array.isArray(location) ? location[0] : location;

if (!cityName) {
  return res.status(400).json({ 
    error: "City name is required" 
  });
}

const city = await prisma.city.findFirst({
  where: { 
    name: {
      equals: cityName as string,
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
    catch(e : unknown)
    {
        if(e instanceof Error)
        {
            return res.status(500).json({

                status : "error" ,
                message : "Find error to store data" ,
                error : e.message

            }) ;
        }
        else
        {
            return res.status(500).json({

                status : "error" ,
                message : "Find error to store data" ,
                error : e

            })
        }
    }

}


// get data using id and search type 
let getDetails = async function(req:Request , res:Response) : Promise<Response> {

    try
    {
        let id_ = Number(req.params.id) ;
        let searchType = req.query.searchtype ;

        let result , city_ ;

        if(searchType !== "flight" && searchType !== "attraction")
        {
            return res.status(400).json({

                status : "false" ,
                message : "Search type should be Flight or Attraction" 

            }) ;
        }

        if(searchType === "flight")
        {
            result = await prisma.flight.findUnique({

                where : {
                    id : id_ 
                }

            }) ;
        }
        else
        {
            result = await prisma.attraction.findUnique({

                where : {
                    id : id_ 
                }

            });
        }

        if(result)
        {
            city_ = await prisma.city.findUnique({
                where : {
                    id : result.cityId 
                }
            }) ;
        }
            

        return res.status(200).json({

            status : "success" ,
            message : "Data successfully fetched" ,
            data : {
                geoId : {
                    city : city_ 
                } ,
                Information : result
            } 

        }) ;

    }
    catch(e : unknown)
    {
        if(e instanceof Error)
        {
            return res.status(500).json({

                status : "error" ,
                message : "Find error to store data" ,
                error : e.message

            }) ;
        }
        else
        {
            return res.status(500).json({

                status : "error" ,
                message : "Find error to store data" ,
                error : e

            })
        }
    }

}

// export code 

export {getSearch , getDetails}
