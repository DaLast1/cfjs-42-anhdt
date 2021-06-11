const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');

// kết nối mongodb server
mongoose.connect('mongodb://localhost:27017/quyetde',
  { useNewUrlParser: true },
  (err) => {
    if (err) throw err;
    console.log('connect mongodb successfully')
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client'));

app.get('/', (req, res) => {
  const pathFile = path.resolve(__dirname, './client/home.html');
  res.sendFile(pathFile)
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/random-question', (req, res) => {
  // lấy ngẫu nhiên một câu hỏi
  fs.readFile('data.json', (err, data) => {
    if (err) return res.send({ success: 0 });

    const questions = JSON.parse(data);

    const randomIndex = getRandomInt(0, questions.length);

    const foundQuestion = questions[randomIndex];

    return res.send({ success: 1, data: foundQuestion });
  })
})

app.get('/ask', (req, res) => {
  const pathFile = path.resolve(__dirname, './client/create-question.html');
  res.sendFile(pathFile)
})

app.post('/create-question', async (req, res) => {
  const { content } = req.body;

  const newQuestionData = { content };

  const newQuestion = await QuestionModel.create(newQuestionData);

  res.send({ 
    success: 1, 
    data: 
      {
        ...newQuestion,
        id: newQuestion._id
      }
  })
})

app.get('/question/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/detail-question.html'))
})

// app.get('/detail-question') 
app.get('/detail-question/:id', async (req, res) => {
  const idQuestion = req.params.id;
  const foundQuestion = await QuestionModel.findById(idQuestion);

  if (!foundQuestion) {
    return res.send({ success: 0 });
  }

  return res.send({ success: 1, data: foundQuestion });
})


app.get('/vote-question/:idQuestion/:voteType', (req, res) => {
  const { idQuestion, voteType } = req.params;

  fs.readFile('data.json', (err, data) => {
    if (err) return res.send({ success: 0 });

    const questions = JSON.parse(data);

    const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));

    if (!foundQuestion) {
      return res.send({ success: 0 });
    }

    const key = `${voteType}Count`;
    foundQuestion[key]++

    // lưu lại questions
    fs.writeFileSync('data.json', JSON.stringify(questions))

    return res.send({ success: 1, data: foundQuestion });
  })
});


app.get('*', (request, response) => {
  response.send({ say: '404' });
})


app.listen(3000, (err) => {
  if (err) throw err;

  console.log('Server started');
})