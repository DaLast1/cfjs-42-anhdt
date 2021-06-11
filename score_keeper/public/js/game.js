const idGame = window.location.pathname.split('/').pop();
let globalScores = [
    [0, 0, 0, 0]
]
const changeScore = function(e) {
    const $el = $(e.target);
    const value = $el.val();
    const row = $el.data('row');
    const col = $el.data('col');
    globalScores[row][col] = parseInt(value);
    let sumCol = 0;
    for (let i = 0; i < globalScores.length; i++) {
        sumCol += globalScores[i][col];
    }

    let sumRow = globalScores[row][0] + globalScores[row][1] + globalScores[row][2] + globalScores[row][4];

    $(`#gameResult tbody th[data-col="${col}"`).html() = sumCol;
    $(`#gameResult .row-name[data-col="${row}"`).html() = sumRow;
}

$.ajax({
    url: `/api/games/${idGame}`,
    type: 'GET'
})
.then(res => {
    globalScores = scores;

    if (res.success) {
        const game = res.data;
        const { players, scores } = game;
        $('#gameResult thead').append(/*html*/ `
            <th scope="col">#</th>
            <th scope="col">${players[0]}</th>
            <th scope="col">${players[1]}</th>
            <th scope="col">${players[2]}</th>
            <th scope="col">${players[3]}</th>
            `
        )
        let sumCol = [0, 0, 0, 0];
        let sumRow = [];
        for (let i = 0; i < scores.length; i++) {
            const round = scores[i];
            for (let j = 0; j < round.length; j++) {
                sumCol[j] += round[j];
                sumRow[i] = sumRow[i] ? sumRow[i] + round[j] : round[j];
            }
        }
        $('#gameResult tbody').append(/*html*/ `
            <th scope="col">Total</th>
            <th scope="col" data-col="0">${sumCol[0]}</th>
            <th scope="col" data-col="1">${sumCol[1]}</th>
            <th scope="col" data-col="2">${sumCol[2]}</th>
            <th scope="col" data-col="3">${sumCol[3]}</th>
            `
        )
        const scoreHTML = scores.map((round, idx) => {
            return /*html*/ `
                <tr>
                    <td class="row-name" data-row="${idx}" scope="col">Round ${idx + 1} (${sumRow[idx]})</td>
                    <td scope="col">
                        <input class="form-control" type="number" value="${round[0]}" oninput="changeScore(event)" data-col="0" data-row="${idx}">
                    </td>
                    <td scope="col">
                        <input class="form-control" type="number" value="${round[1]}" oninput="changeScore(event)" data-col="1" data-row="${idx}">
                    </td>
                    <td scope="col">
                        <input class="form-control" type="number" value="${round[2]}" oninput="changeScore(event)" data-col="2" data-row="${idx}">
                    </td>
                    <td scope="col">
                        <input class="form-control" type="number" value="${round[3]}" oninput="changeScore(event)" data-col="3" data-row="${idx}">
                    </td>
                </tr>
            `
        }).join('');
        $('#gameResult tbody').append(scoreHTML);
    } else {
        alert('Server Error');
    }
})