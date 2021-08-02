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


app.listen(8080, function(){
    console.log("Api is listening")
})

