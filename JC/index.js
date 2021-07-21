const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())

//Create a post route to add a person
app.post('/addPerson', function(postmanReq, postmanRes) {
    //we are calling http://java-sample-api-2020.herokuapp.com/addPerson
    console.log("Adding a person...")
    console.log(postmanReq.body)
    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson', postmanReq.body)
    .then(function (apiResponse) {
        postmanRes.status(200).json({"message":"user added"})
    })
    //catch for errors should be working
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not add user"})
    })
})

//Create a route to get all people
app.get('/getAllPeople', function(postmanReq, postmanRes) {
    //we are calling http://java-sample-api-2020.herokuapp.com/getAllPeople
    console.log("Showing all people...")
    axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
    .then((response) => {
        console.log(response.data)
        postmanRes.status(200).json({"message":"users in console"})
    })
    //catch for errors should be working
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not get all people"})
    })
})

//Create a route to delete a person
app.delete('/deletePerson', function(postmanReq, postmanRes) {
    //this is the URL needed https://java-sample-api-2020.herokuapp.com/deletePerson?id=1
    //Note: query must change depending on what the user enters (so ?id=1 shouldn't be hardwritten like it is shown, but should be based on
    //what the user says)
    console.log("Removing a person...")
    //console.log("our current query: " + postmanReq.query.id) //testing how to add user query correctly (according to expressJS docs)
    axios.delete('https://java-sample-api-2020.herokuapp.com/deletePerson?id=' + postmanReq.query.id)   
    .then((response) => {
        console.log(response.data)
        postmanRes.status(200).json({"message":"user removed"})
    })
    //catch for errors should be working
    .catch((error) => {
        console.log(error)
        postmanRes.json({"error":"could not remove a person"})
    })
})

//Have port on 3000 listening to requests made via Postman
app.listen(3000, function() {
    console.log("API is listening")
})