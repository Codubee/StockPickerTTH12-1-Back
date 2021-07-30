const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())



app.post('/stocks/addStock', function(req, res){
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



app.listen(3000, function(){
    console.log('API is listening.')
})