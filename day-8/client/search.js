$(document).ready(() => {
  $('#form').on('submit', (e) => {
    e.preventDefault();
    
    const keyword = $('#searchInput').val();

    $.ajax({
      url: 'http://localhost:3000/search-question',
      method: 'GET',
      data: {
        keyword
      },
      success: (res) => {
        // End Bước 1
        if (res.success) {
          const { data:questions } = res;
          
          const htmlStrArr = questions.map(question => {
            const { content, yesCount, noCount } = question;

            return `
            <li class="list-group-item">
              ${content}
              <span class="badge badge-success badge-pill">${yesCount}</span>
              <span class="badge badge-danger badge-pill">${noCount}</span>
            </li>`
          });
          
          const htmlDom = htmlStrArr.join('');

          $('#result').html('');

          $('#result').append(htmlDom);
        }
      }
    })
  })
})