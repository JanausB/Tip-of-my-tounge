var request = require('request');
var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/results", function(req, res){
    var search = req.query.search;
    var type = '&type=' + req.query.type;
    var year = '';
    if(req.query.year)
        year = '&y=' + req.query.year;
    var url = 'http://www.omdbapi.com/?apikey=thewdb&s='+ search + type + year;
    console.log(url);
    request(url, function (error, response, body) {
        if(error){
            console.log('error:', error); // Print the error if one occurred
        }
        else if(response.statusCode == 200){
            //shit worked
            var data = JSON.parse(body);
            console.log("Get request sucessful", data); // Print the HTML for the Google homepage.
            res.render("results", {data: data});
        }
        else
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    });
});

app.get("/", function(req, res){
   res.render("search"); 
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listner Service spinning, up. We're in the pipe, 5 by 5!");
});