const express = require('express');
var app = express();
const axios = require('axios');
const { response } = require('express');
app.use(express.json());

//POST Route (/addPerson)
app.post('/addPerson', (req, res) => {
    console.log(req.body)
    const body = req.body

    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson',body)
    .then((response) => {
        console.log(response.data)
        res.status(200).json(response.data)
    })

    .catch((error) => {
        console.log("Error Has Occured")
        res.json({ErrorResponse: "Unsuccessful Route"})
    })
});

//DELETE Route (/deletePerson)
app.delete('/deletePerson', (req, res) => {
    const { id } = req.params.id

    axios.delete('https://java-sample-api-2020.herokuapp.com/deletePerson?id='+id)
    .then((response) => {
        console.log(response.data)
        res.status(200).json(response.data)
    })

    .catch((error) => {
        console.log("Error Has Occured")
        res.json({ErrorResponse: "Unsuccessful Route"})
    })
});

//GET Route (/getAllPeople)
app.get('/getAllPeople', (req, res) => {
    axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
    .then((response) => {
        console.log(response)
        res.status(200).json(response.data)
    })

    .catch((error) => {
        console.log("Error Has Occured")
        res.json({ErrorResponse: "Unsuccessful Route"})
    })
});

app.listen(8080, function() {
    console.log('API is working')
})