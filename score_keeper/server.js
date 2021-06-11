const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const gameModel = require('./models/game');

mongoose.connect('mongodb://localhost:27017/keep-the-score', 
    {
        useNewUrlParser: true
    },
    (err) => {
        if (err) throw err;
        console.log('MongoDB connected');
    }
);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const pathFile = path.resolve(__dirname, './public/html/home.html');
    res.sendFile(pathFile);
})

app.get('/game/:idGame', (req, res) => {
    const pathFile = path.resolve(__dirname, './public/html/game.html');
    res.sendFile(pathFile);
})

app.get('/api/games/:idGame', async (req, res) => {
    const { idGame } = req.params;

    try {
        const foundGame = await gameModel.findById(idGame);
        if (!foundGame) {
            return res.status(400).send({ success: 1, data: null});
        }

        return res.send({ success: 1, data: foundGame});
    } catch (err) {
        res.status(500).send({ success: 0, data: null, message: err });
    }
})

app.post('/api/games', async (req, res) => {
    const {players} = req.body;

    const newGame = {
        players, 
    }

    try {
        const newGameData = await gameModel.create(newGame);
        res.status(201).send({ success: 1, data: newGameData});
    } catch (err) {
        res.status(500).send({ success: 0, data: null, message: err });
    }
})

app.use('*', (req, res) => {
    const pathFile = path.resolve(__dirname, './public/html/404.html');
    res.sendFile(pathFile);
})

app.listen(5000, (err) => {
    if (err) throw err;
    console.log('Server started successfully');
});