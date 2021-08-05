const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())


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


app.delete('/stocks/deleteStock', (postmanRequest, postmanResponse) => {
    const { userId } = postmanRequest.params.userId
    const { stockId } = postmanRequest.params.stockId

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



app.listen( process.env.PORT || 8080, () => console.log('Example app listening at http://localhost:8080'))
