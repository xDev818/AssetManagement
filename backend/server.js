// Packages
require('dotenv').config()
var express = require("express");
var cors = require('cors');

// Routes
const usersRoutes = require('./routes/users_routes')

// Server Initialization
var app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/",(req,res) => 
{
    res.json("Hello Test")
}
)


/** Comments
 *  Date : 10/12/23 
    Author : Nole
    Activities 
    Purpose : Create new server.js class
            Initiate the DB Connection
            app.listen(process.env.PORT,() => {..}


    Date : 10 / 12 / 23
    Author : jinshin
    Activities
    Purpose : 
            - remove mysql package ( e.g: const mysql = require('mysql2') )
            - imported userRoutes = const usersRoutes = require('./routes/users_routes')
            - to use the userRoutes = app.use('/api', usersRoutes)

 */

app.listen(process.env.PORT,() => {
    connection.connect(function(err)
    {
        if(err)
        {
         
            console.log("No Database Present");
        } else
        {
           
            console.log("Database Connected");
            
            console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`)
        }
    }
    )
}
);

// Api's Routes
app.use('/api', usersRoutes)