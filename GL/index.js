
// Import and initialize express. Make sure to install express using NPM
const express = require("express")
const app = express()
const axios = require('axios')
app.use(express.json())

//route to add person to database 
app.post('/addPerson', function(req, res){
    console.log('adding a person')
    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson', req.body)
        .then(function(apiResponse){

            res.json({"message":`Person added.`})
            
        })
        .catch((error) => {
            console.log(error);
            res.json({"message":"api call didnt connect "})
        })
})

//route to get all people
app.get('/getAllPeople', function(req, res) {
    console.log("List of registered users")
    data = axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
        .then((response) => {
            const data = response.data
            res.json({"message":"Users shown", "Users":`${response.data}`})
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.json({"message":"api call didnt connect"})
        })

    console.log(data)
})

//route to delete a specific person

app.delete('/deletePerson', function(req, res){
    console.log(`ID : ${req.query['id']} removal`)  
    const id = req.query['id']
    const url = 'http://java-sample-api-2020.herokuapp.com/deletePerson?id='+id
    
    axios.delete(url)
        .then((response) => {
            console.log(`${response.data}`)
            res.json({"message":"Successfully deleted. "})
        })
        .catch((error) => {
            console.log(error);
            res.json({"message": "api call didnt connect"})
        })
})

app.listen(8080, function (){
     console.log("app is listening")
})

