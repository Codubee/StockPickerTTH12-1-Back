const express = require("express")
const app = express()
const axios = require('axios')
app.use(express.json())

//Route to get a stock from the database. Calling https://codubee-projects-api.herokuapp.com/stocks/getStockData
app.get('/getStockData', function(postmanReq, postmanRes) {
    console.log("Getting Data for a Stock...")
    axios.get('https://codubee-projects-api.herokuapp.com/stocks/getStockData')
    .then((response) => {
        console.log(response.data)
        postmanRes.status(200).json({"message":response.data})
    }) 
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not get stock data"})
    })
})

//Have port on 3000 listening to requests made via Postman
app.listen(3000, function() {
    console.log("API is listening")
})
