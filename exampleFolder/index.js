const express = require('express');
var app = express();
const axios = require('axios');
const { response } = require('express');

//POST Route (/addPerson)
app.post('/addPerson', (req, res) => {
    console.log(req.body)
    const body = req.body

    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson',body)
    .then((res) => {
        console.log(res.data)
        res.status(200).json(res.data)
    });
});

//DELETE Route (/deletePerson/:id)
app.delete('/deletePerson/:id', (req, res) => {
    const { id } = req.params;

    axios.delete('https://java-sample-api-2020.herokuapp.com/deletePerson?id=1', id)
    .then((res) => {
        console.log(res.data)
        res.status(200).json(res.data)
    });
});

//GET Route (/getAllPeople)
app.get('/getAllPeople', (req, res) => {
    axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
    .then((res) => {
        console.log(response)
    });
});

app.use(express.json());