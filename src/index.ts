// import all the modules and packages 

import dotenv from "dotenv" ;
dotenv.config() ;
import chalk from "chalk" ;

import { myServer } from "./app"; 

// main code 

let PORT = process.env.PORT || 5000 ;
let designConsole = chalk.bgRed.bold ;


myServer.listen(PORT , function():void{

    console.log(designConsole(`Server is running at http://localhost:${PORT} ...`)) ;

});


