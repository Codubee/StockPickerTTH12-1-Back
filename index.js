const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())

app.get('/getWeather', function(req, res){
    const url = 'https://codubee-projects-api.herokuapp.com/getWeather'
    axios.get(url)
        .then((response) => {
            console.log(response.data)
            res.status(200).json({"Temp: ": response.data})
        })
        .catch((error) => {
            console.log(error);
            res.json({"Error": "Couldn't load weather"})
        })
})



app.listen(8080, function(){
    console.log("Api is listening")
})

