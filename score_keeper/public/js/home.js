$('#createGameForm').on('submit', (e) => {
    e.preventDefault();

    const p1 = $('#player1').val();
    const p2 = $('#player2').val();
    const p3 = $('#player3').val();
    const p4 = $('#player4').val();

    const players = [
        p1,
        p2,
        p3,
        p4
    ]

    $.ajax({
        url: '/api/games',
        type: 'POST',
        data: {
            players
        }
    })
    .then(res => {
        if (res.success) {
            window.location.href = `/game/${res.data._id}`;
        } else {
            alert('Server error');
        }
    })
})