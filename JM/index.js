const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())
require('dotenv').config();

app.post('/addPerson', function(postmanRequest, postmanresponse){
    console.log(postmanRequest.body)
    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson', postmanRequest.body) 
    .then(function(apiResopnse){
        postmanresponse.json({"message": "User added"})
    })

     .catch((error) => {
         console.log(error);
         postmanresponse.json({"message": "Error "})
    })
})

app.get('/getAllPeople', function(postmanRequest, postmanresponse){
    const url = 'http://java-sample-api-2020.herokuapp.com/getAllPeople'

    axios.get(url)
        .then((response) => {

            postmanresponse.json({"message": "Users shown", "Users": response.data})
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
            postmanresponse.json({"message": "Error "})
        })

})

app.delete('/deletePerson', function(postmanRequest, postmanresponse){
    const id = postmanRequest.query['id']
    console.log('Deleting ID: ' + id )
    axios.delete('https://java-sample-api-2020.herokuapp.com/deletePerson?id=' + id) 
    .then(function(response){
        postmanresponse.json({"message": "Deleted Person"})
    })
    .catch(function(error){
        console.log("Catch function");
    })
})


app.get('/getBusiness', function(req, res){
    const config = {headers:{'Authorization': 'Bearer ' + process.env.API_TOKEN}}
    const latitude = req.query["latitude"]
    const longitude = req.query["longitude"]

    axios.get('https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude='+ longitude, config)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.json({"message": "Error could not get location"})
        })
})

app.get('/getEvents', function(req, res){
    const config = {headers:{'Authorization': 'Bearer ' + process.env.API_TOKEN}}

    axios.get('https://api.yelp.com/v3/events', config)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.json({"message": "Error could not get details"})
        })
})

app.get('/getEvent', function(req, res){
    const config = {headers:{'Authorization': 'Bearer ' + process.env.API_TOKEN}}
    id = req.query["id"]

    axios.get('https://api.yelp.com/v3/events/' + id, config)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.json({"message": "Error could not get event"})
        })
})



app.listen(8080, function(){
    console.log("Api is listening")
})

