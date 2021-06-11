const textArea = document.querySelector('.formQuestion');
const form = document.getElementById('form');

// B1: bắt sự kiện
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // B2: lấy giá trí của textarea
  const content = textArea.value;

  // B3: Gửi lên server
  $.ajax({
    url: 'http://localhost:3000/create-question',
    type: 'POST',
    data: {
      content
    },
    success: (res) => {
      if (res.success) {
        const idQuestion = res.data.id;
        window.location.href = "http://localhost:3000/question/" + idQuestion;
      }
    },
    error: (res) => {
      console.log(res);
    }
  })
})

textArea.addEventListener('input', () => {
  console.log('vao day');
  const content = textArea.value;
  const restCharacterLength = 200 - content.length;

  const restSpan = document.getElementById('rest');
  restSpan.innerHTML = restCharacterLength;
})