const textArea = $('.formQuestion');
const form = $('#form');

// B1: bắt sự kiện
form.on("submit", (event) => {
  event.preventDefault();

  // B2: lấy giá trí của textarea
  const content = textArea.val();

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

textArea.on('input', () => {
  console.log('vao day');
  const content = textArea.val();
  const restCharacterLength = 200 - content.length;

  const restSpan = $('#rest');
  restSpan.html(restCharacterLength);
})