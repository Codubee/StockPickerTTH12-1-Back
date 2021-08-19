const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())
require('dotenv').config()

//For calling Yelp API

//Create a route to connect to yelps event api
app.get('/getEvents', function(req, res) {
    const config = {headers:{'Authorization':'Bearer ' + process.env.API_TOKEN}}
    const url = 'https://api.yelp.com/v3/events'
    axios.get(url, config)
    .then((response) => {
        console.log("Getting Events from Yelp")
        res.status(200).json({"Events":response.data})
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
        res.json({"error":"could not get events"})
    })
})

//create a route to get the details of an event
app.get('/getEvent', function(req, res) {
    const config = {headers:{'Authorization':'Bearer ' + process.env.API_TOKEN}}
    var userQuery = req.query.id
    const url = 'https://api.yelp.com/v3/events/' + userQuery
    axios.get(url, config)
    .then((response) => {
        console.log("Getting event information for: " + userQuery)
        res.status(200).json({"Event":response.data})
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
        res.json({"error":"could not get event from the id"})
    })
})

//create a route to get buisnesses based on location or latitude/longitude
app.get('/getBusinesses', function(req, res) {
    const config = {headers:{'Authorization':'Bearer ' + process.env.API_TOKEN}}
    var getParams = req.url
    var url = ''
    if (getParams.includes("location")) {
        const location = req.query.location
        url = 'https://api.yelp.com/v3/businesses/search?location=' + location
    }
    else {
        //Documentation states that latitude and longitude required if location is not provided
        const latitude = req.query.latitude
        const longitude = req.query.longitude
        url = 'https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude=' + longitude
    }
    axios.get(url, config)
    .then((response) => {
        console.log("Getting businesses information")
        res.status(200).json({"Businesses":response.data})
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
        res.json({"error":"could not get list of businesses"})
    })
})

//From Previous

//Create a post route to add a person
app.post('/addPerson', function(postmanReq, postmanRes) {
    console.log("Adding a person...")
    console.log(postmanReq.body)
    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson', postmanReq.body)
    .then(function (apiResponse) {
        postmanRes.status(200).json({"message":"user added"})
    })
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not add user"})
    })
})

//Create a route to get all people
app.get('/getAllPeople', function(postmanReq, postmanRes) {
    console.log("Showing all people...")
    axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
    .then((response) => {
        console.log(response.data)
        postmanRes.status(200).json({"message":response.data})
    })
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not get all people"})
    })
})

//Create a route to delete a person
app.delete('/deletePerson', function(postmanReq, postmanRes) {
    console.log("Removing a person...")
    var userQuery = postmanReq.query.id
    axios.delete('https://java-sample-api-2020.herokuapp.com/deletePerson?id=' + userQuery)   
    .then((response) => {
        console.log(response.data)
        postmanRes.status(200).json({"message":"user removed"})
    })
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not remove a person"})
    })
})

//Have port on 3000 listening to requests made via Postman
app.listen(3000, function() {
    console.log("API is listening")
})