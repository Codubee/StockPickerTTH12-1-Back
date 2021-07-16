const express = require("express")
const app = express()
const axios = require('axios')
app.use(express.json())

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
})

//create a route called : /getAllPeople
//URL : http://java-sample-api-2020.herokuapp.com/getAllPeople
app.get('/getAllPeople', function(req, res) {
    console.log("showing all the people")
    data = axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
        .then((response) => {
            const data = response.data
            res.json({"message":"Users shown", "Users":`${data['1']['name']}`})
            console.log(data)
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
})


app.listen(3000, function(){
    console.log('API is listening.')
})