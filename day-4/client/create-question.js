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
      console.log(res);
    },
    error: (res) => {
      console.log(res);
    }
  })
})