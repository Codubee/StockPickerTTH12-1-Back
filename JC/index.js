const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())

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