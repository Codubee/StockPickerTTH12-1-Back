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
    //res.json({'message':'showing all the people.'})
    axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
        .then((response) => {
            const data = response.data
            res.json({"message":"Users shown", "Users":`${data.json}`})
            console.log(data)
        })
/*
        .then(function() {
            res.json({"message":"Users shown", "Users":`${data}`})
            console.log(data)
        })
*/
/*
    async function axiosTest() {
        const axiosResponse = await axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
        console.log(axiosResponse.json)
        res.json({"message":"Users shown", "Users":`${axiosResponse.json}`})
    }
*/

})

//route name : /deletePerson
//URL : http://java-sample-api-2020.herokuapp.com/deletePerson/:UserId

app.listen(3000, function(){
    console.log('API is listening.')
})