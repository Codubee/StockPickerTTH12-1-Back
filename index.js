const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())
var cors = require('cors')
app.use(cors())


app.get('/getMatches', function(req, res){
      
    const id = req.query['userId']
   const url = 'https://codubee-projects-api.herokuapp.com/stocks/getMatches?userId='+id
    
    axios.get(url)
        .then((response) => {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.json({"message": "api call didnt connect"})
        })
        
})

app.get('/getWeather', function(req, res){
    const url = 'https://codubee-projects-api.herokuapp.com/getWeather'
    axios.get(url)
        .then((response) => {
            console.log(response.data)
            res.status(200).json({"Temp": response.data})
        })
        .catch((error) => {
            console.log(error);
            res.json({"Error": "Couldn't load weather"})
   })
})


app.post('/addStock', function(req, res){
    const data = req.body
    const url ='https://codubee-projects-api.herokuapp.com/stocks/addStock'
    axios.post(url, data)
        .then(function(response){
            res.status(200).json({"message" : "Successful"})
        })
        .catch(function(error){
            res.json({"message":"Unsuccessful"})

        })
})


app.delete('/deleteStock', (postmanRequest, postmanResponse) => {
    const userId = postmanRequest.query.userId
    const stockId = postmanRequest.query.stockId

    axios.delete('https://codubee-projects-api.herokuapp.com/stocks/deleteStock?userId='+userId + '&stockId='+stockId)
    .then((response) => {
        console.log(response.data)
        postmanResponse.status(200).json({"Deleted Stock: ":response.data})
    })

    .catch((error) => {
        console.log(error)
        postmanResponse.json({"ErrorResponse": "Couldnt Delete Stock"})
    })
});


app.get('/getStockData', function(postmanReq, postmanRes) {
    console.log("Getting Data for a Stock...")
    axios.get('https://codubee-projects-api.herokuapp.com/stocks/getStockData')
    .then((response) => {
        console.log(response.data)
        postmanRes.status(200).json({"Data":response.data})
    })
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not get stock data"})
    })
})




app.listen( process.env.PORT || 8080, () => console.log('Example app listening at http://localhost:8080'))
