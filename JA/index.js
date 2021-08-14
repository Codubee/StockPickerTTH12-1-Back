const express = require("express")
const app = express()
const axios = require('axios')
require("dotenv").config();
app.use(express.json())


//GET https://api.yelp.com/v3/events
//Create a route to get the details of an event
app.get('/getEvents', function(req, res){
    const config = {headers:{"Authorization":'Bearer ' + process.env.API_TOKEN}}
    url = 'https://api.yelp.com/v3/events'
    axios.get(url, config)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(err) {
            res.json({message:"unsuccessful", error: err})
        })
})

//GET https://api.yelp.com/v3/events/{id}
//Create a route to connect to yelps event api
app.get('/getEvent', function(req, res){
    const config = {headers:{"Authorization":'Bearer ' + process.env.API_TOKEN}}
    id = req.query["id"]
    url = 'https://api.yelp.com/v3/events/'  + id
    axios.get(url, config)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(err){
            res.json({message:"unsuccessful", error:err})
        })
})

//GET https://api.yelp.com/v3/businesses/search
//Create a route to connect to yelps search api
app.get('/getBusiness', function(req, res){
    const config = {headers:{"Authorization":'Bearer ' + process.env.API_TOKEN}}
    const latitude = req.query["latitude"]
    const longitude = req.query["longitude"]
    const url = 'https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude='+ longitude
    axios.get(url, config)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(err){
            res.json({message:"unsuccessful", error:err})
        })
})

//create a route that adds a person to the db. 
//must be able to handle incoming details of the person being added. 
//route name : /addPerson
//URL : http://java-sample-api-2020.herokuapp.com/addPerson
app.post('/addPerson', function(req, res){
    console.log('adding a person')
    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson', req.body)
        .then(function(apiResponse){
            res.json({"message":`Person added.`})
        })
        .catch((error) => {
            console.log(error);
            res.json({"message":"Unsuccessful. "})
        })
})

//create a route called : /getAllPeople
//URL : http://java-sample-api-2020.herokuapp.com/getAllPeople
app.get('/getAllPeople', function(req, res) {
    console.log("showing all the people")
    data = axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
        .then((response) => {
            const data = response.data
            res.json({"message":"Users shown", "Users":`${data}`})
            console.log(data)
        })
        .catch((error) => {
            console.log(error);
            res.json({"message":"Unsuccessful. "})
        })
        
    console.log(data)
})

//route name : /deletePerson
//URL : http://java-sample-api-2020.herokuapp.com/deletePerson/:UserId
app.delete('/deletePerson', function(req, res){
    console.log(`Deleting the Person with ID ${req.query['id']}`)  
    const id = req.query['id']
    const url = 'http://java-sample-api-2020.herokuapp.com/deletePerson?id='+id
    console.log(`${url}`)
    axios.delete(url)
        .then((response) => {
            console.log(`${response.data}`)
            res.json({"message":"Successfully deleted. "})
        })
        .catch((error) => {
            console.log(error);
            res.json({"message":"Unsuccessful. "})
        })
})


app.listen(3000, function(){
    console.log('API is listening.')
})