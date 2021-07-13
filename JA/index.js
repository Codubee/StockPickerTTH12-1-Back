const express = require("express")
const app = express()
const axios = require('axios')
app.use(express.json())

//create a route that adds a person to the db. 
//must be able to handle incoming details of the person being added. 
//route name : /addPerson
//URL : http://java-sample-api-2020.herokuapp.com/addPerson


//create a route called : /getAllPeople
//URL : http://java-sample-api-2020.herokuapp.com/getAllPeople
app.get('/getAllPeople', function(req, res) {
    console.log("showing all the people")
    //res.json({'message':'showing all the people.'})
    axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople', res.body)
    .then(function(apiResponse){
        res.json({"message":"Users shown", "Users":`${res.body}`})
    })
})

//route name : /deletePerson
//URL : http://java-sample-api-2020.herokuapp.com/deletePerson/:UserId

app.listen(3000, function(){
    console.log('API is listening.')
})