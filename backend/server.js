require('dotenv').config()
var express = require("express");

var cors = require('cors');
var mysql = require("mysql2");
var connection = require('./database');

const {randomUUID } = require('crypto')

var app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => 
{
    res.json("Hello Test")
}
)

function Comments () {

    // Date : 10/12/23 
    // Author : Nole
    // Activities 
    // Purpose : Create new server.js class
    //           Initiate the DB Connection
    //           app.listen(process.env.PORT,() => {..}
    //
    
    // Date : 
    // Author : 
    // Activities
    // Purpose : 
}

app.listen(process.env.PORT,() => {
    connection.connect(function(err)
    {
        if(err)
        {
          
            console.log("No Database Present");
        } else
        {
            const id = randomUUID()
            console.log("Random ID : " + id);
            console.log("Database Connected");
            
            console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`)
        }
    }
    )
}
);