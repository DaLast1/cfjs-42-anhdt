const getRandomQuestion = () => {
  $.ajax({
    url: `http://localhost:3000/random-question`,
    method: 'GET',
    success: (res) => {
      if (res.success) {
        const question = res.data;
        const { content, yesCount:yes, noCount:no } = question;
        // nhiệm vụ render client :
        document.getElementById('contentQuestion').innerHTML = content;
      }
    },
    error: (res) => {
      console.log(res);
    } 
  })
}

getRandomQuestion();

const otherQuestionBtn = document.getElementById('otherQuestion');
otherQuestionBtn.addEventListener('click', () => {
  // c1: Load lại trang
  // window.location.reload();

  // c2: gọi lại http get random question
  getRandomQuestion();
})