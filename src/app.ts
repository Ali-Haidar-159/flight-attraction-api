// import all the modules and packages 

import {Application,Request,Response,NextFunction} from "express" ;
import express from "express" ;

import morgan from "morgan";
import cors from "cors" ;

import {createServer} from "http" ;

import { saveRouter } from "./router/saveData.router";
import { findRouter } from "./router/findData.router";


// main code 

let app:Application = express() ;
let myServer = createServer(app) ;

// connection with server 

app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;

app.use(morgan("dev")) ;
app.use(cors()) ;

app.use("/save" , saveRouter) ;
app.use(findRouter)

// req-res-cycle 

app.get("/" , function(req:Request , res:Response):Response{

    return res.status(200).json({

        status : 200 ,
        messgae : "Home Page"

    }) ;

}) ;

// error handling 

app.use(function(req:Request,res:Response,next:NextFunction):Response{

    return res.status(404).json({

        status : 404 ,
        message : "Page not found !"

    });

});

app.use(function(err:unknown , req:Request , res:Response , next:NextFunction):Response{

    if(err instanceof Error)
    {
        return res.status(500).json({

            status : 500 ,
            messgae : "Find server error !" ,
            error : err.message

        }) ;
    }
    else
    {
        return res.status(500).json({

            status : 500 ,
            messgae : "Find server error !" ,
            error : err

        }) ;
    }

})

// export all the modules and packages 

export {myServer}

