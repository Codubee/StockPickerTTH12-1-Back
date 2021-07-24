const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())

app.post('/addPerson', function(postmanRequest, postmanresponse){
    console.log(postmanRequest.body)
    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson', postmanRequest.body) 
    .then(function(apiResopnse){
        postmanresponse.json({"message": "User added"})
    })
})

app.get('/getAllPeople', function(postmanRequest, postmanresponse){
    const url = 'http://java-sample-api-2020.herokuapp.com/getAllPeople'
    data = axios.get(url)
        .then((response) => {
            const data = response.data
            postmanresponse.json({"message": "Users shown", "Users": data})
            console.log(data)
        })
        .catch((error) => {
            console.log(error);
            postmanresponse.json({"message": "Error "})
        })
    console.log(data)
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


app.listen(8080, function(){
    console.log("Api is listening")
})

