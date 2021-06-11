const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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

app.get('/search', (req, res) => {
  const pathFile = path.resolve(__dirname, './client/search.html');
  res.sendFile(pathFile)
});

app.get('/search-question', async (req, res) => {
  const { keyword } = req.query;
  const newRegex = new RegExp(keyword, 'i');
  const questions = await QuestionModel
    .find({ content: { $regex: newRegex }});
  
  // end Bước 2
  return res.send({ success: 1, data: questions })
})


app.get('/random-question', async (req, res) => {
  const questions = await QuestionModel.aggregate([
    { $sample: { size: 1 } }
  ]);

  if (questions.length) {
    const foundQuestion = questions[0];
    return res.send({
      success: 1,
      data: {
        ...foundQuestion,
        id: foundQuestion._id
      } 
    });
  }
  return res.send({ success: 0 });
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

app.get('/detail-question/:id', async (req, res) => {
  const idQuestion = req.params.id;
  const foundQuestion = await QuestionModel.findById(idQuestion).lean();

  if (!foundQuestion) {
    return res.send({ success: 0 });
  }

  return res.send({ success: 1, data: {
    ...foundQuestion,
    id: foundQuestion._id
  }});
})


app.get('/vote-question/:idQuestion/:voteType', async (req, res) => {
  const { idQuestion, voteType } = req.params;

  const voteTypeKey = `${voteType}Count`;
  const question = await QuestionModel
    .findByIdAndUpdate(
      idQuestion,
      { 
        $inc: { [voteTypeKey]: 1 }
      },
      {
        new: true
      }
    );
  return res.send({ success: 1, data: question })
});


app.get('*', (request, response) => {
  response.send({ say: '404' });
})

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('Server started');
})