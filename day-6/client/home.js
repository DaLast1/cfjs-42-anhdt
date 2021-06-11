// window.onload = () => {

// }

$(document).ready(() => {
  let idQuestion;

  const getRandomQuestion = () => {
  $.ajax({
    url: `http://localhost:3000/random-question`,
    method: 'GET',
    success: (res) => {
      if (res.success) {
        const question = res.data;
        const { content, yesCount:yes, noCount:no, id } = question;
        // nhiệm vụ render client :
        idQuestion = id;
        $('#contentQuestion').html(content);
      }
    },
    error: (res) => {
      console.log(res);
    } 
  })
}

getRandomQuestion();

const otherQuestionBtn = $('#otherQuestion');
otherQuestionBtn.on('click', () => {
  // c1: Load lại trang
  // window.location.reload();

  // c2: gọi lại http get random question
  getRandomQuestion();
})

const sendRequestVote = (type) => {
  $.ajax({
    url: `http://localhost:3000/vote-question/${idQuestion}/${type}`,
    method: 'GET',
    success: (res) => {
      console.log(res);
      window.location.href = `http://localhost:3000/question/${idQuestion}`
    }
  })
};

$('#noBtn').on('click', () => {
  // gọi lên server request
  // $.ajax({
  //   url: 'http://localhost:3000/vote-question',
  //   method: 'POST',
  //   data: {
  //     idQuestion,
  //     voteType: no,
  //   }
  // })
  // $.ajax({
  //   url: `http://localhost:3000/vote-question/${idQuestion}/no`,
  //   method: 'GET',
  //   success: (res) => {
  //     console.log(res);
  //     window.location.href = `http://localhost:3000/question/${idQuestion}`
  //   }
  // })
  sendRequestVote('no');
})

$('#yesBtn').on('click', () => {
    sendRequestVote('no');
})
})