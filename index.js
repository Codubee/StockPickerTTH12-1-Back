const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())


//post route: (/stocks/addStock)
//Only accept when the req is a yes, meaning user select yes to
//  buying a stock. 
//url : https://codubee-projects-api.herokuapp.com/stocks/addStock
/*
 {
    "userId":"20",
    "stock":{"companyName":"Microsoft","symbol":"MSFT","image":"","stockId":"19"}
}
*/
app.post('/stocks/addStock', function(req, res){
    //check if query field is a yes. 

    //handle the 
    console.log('adding a stock')
    const data = req.body
    const url ='https://codubee-projects-api.herokuapp.com/stocks/addStock'
    axios.post(url, data)
        .then(function(response){
            res.status(200).json({"message" : "Successful"})
        })
        .catch(function(error){
            console.log("unsuccessful")
            res.json({"message":"Unsuccessful"})
        })
})



app.listen(3000, function(){
    console.log('API is listening.')
})