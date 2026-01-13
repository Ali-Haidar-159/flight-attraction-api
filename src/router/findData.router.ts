// import all the packages 

import { Router } from "express";

import { getDetails, getSearch } from "../controller/findData.controller";

// main code 

let findRouter = Router() ;

findRouter.get("/search/:location" , getSearch) ;
findRouter.get("/details/:id" , getDetails) ;

// export code 

export {findRouter}
