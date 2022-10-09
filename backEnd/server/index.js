const express = require("express");
const { cars } = require('../models');
const app = express();
const port = 2002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Create car
app.post('/cars', (req, res) => {
    const body = req.body

    cars.create(body).then(cars => {
        res.status(200).json({ data: cars })
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Get all cars
app.get('/cars', (req, res) => {
    cars.findAll().then(cars => {
        res.status(200).json({ data: cars })
    }).catch(err => {
        res.status(500).json(err)
    });
})

//Get data user by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;

    cars.findByPk(id).then(cars => {
        res.status(200).json({ data: cars })
    }).catch(err => {
        res.status(500).json(err)
    });
})

app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body

    cars.update(body, { where: { 'id': id } }).then(cars => {
        res.status(200).json({ data: cars })
    }).catch(err => {
        res.status(500).json(err)
    })
})

app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;

    cars.destroy({ where: { 'id': id } }).then(cars => {
        res.status(200).json({ data: cars })
    }).catch(err => {
        res.status(500).json(err)
    })
})

app.listen(port, () => {
    console.log('Server Side running at port', port)
})