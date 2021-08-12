const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())



app.get('/getMatches', function(req, res){
      
    const id = req.query['userId']
   const url = 'https://codubee-projects-api.herokuapp.com/stocks/getMatches?userId='+id
    
    axios.get(url)
        .then((response) => {
            console.log(response.data)
            res.status(200).json({"Matches": response.data})
        })
        .catch((error) => {
            console.log(error);
            res.json({"message": "api call didnt connect"})
        })
        
})


app.listen( process.env.PORT || 8080, () => console.log('Example app listening at http://localhost:8080'))
