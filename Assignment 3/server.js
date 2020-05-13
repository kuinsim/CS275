//Node.js server file

var express = require('express')
var app = express()
var request = require('request')

app.use(express.static("."))

//Process request for sum request
app.get("/sum", function (req,res) {
    var seed = req.query.n

    //User input error handling
    if (seed.length == 0 || seed < 0 || isNaN(seed) || (seed % 1) != 0) {
        res.send("<br>Please enter a positive integer.")
    }

    //Continue to calculation
    else {
        var sum = 0
        
        for (i=0; i<=seed; i++) {
            sum += i
        }

        res.send("<br>The summation for " + seed + " is " + sum)
    }
})

//Process request for fact request
app.get("/fact", function (req,res) {
    var seed = req.query.n

    //User input error handling
    if (seed.length == 0 || seed < 0 || isNaN(seed) || (seed % 1) != 0) {
        res.send("<br>Please enter a positive integer.")
    }

    //Continue to calculation
    else {
        var fact = 1

        for (i=1; i<=seed; i++) {
            fact *= i
        }

        res.send("<br>The factorial for " + seed + " is " + fact)
    }
})

//Redirect to main html page
app.get('/sk3665_HW3.html', function (req,res) {
    res.redirect("./sk3665_HW3.html")
})

//Server listen to port 8080
app.listen(8080, function() {
    console.log("Server started...")
})