const express = require('express');
var app = express();
const axios = require('axios');
const { response } = require('express');
app.use(express.json());

//DELETE Stock Route
app.delete('/stocks/deleteStock', (postmanRequest, postmanResponse) => {
    const { userId } = postmanRequest.params.userId
    const { stockId } = postmanRequest.params.stockId

    axios.delete('https://codubee-projects-api.herokuapp.com/stocks/deleteStock?userId='+userId + '&stockId='+stockId)
    .then((response) => {
        console.log(response.data)
        res.status(200).json({"Deleted Stock: ":response.data})
    })

    .catch((error) => {
        console.log(error)
        res.json({"ErrorResponse": "Couldnt Delete Stock"})
    })
});

app.listen(8080, function() {
    console.log('API is working')
})