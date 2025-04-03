const playerOne = 'X'
const playerTwo = '0'

let whoseTurn = playerOne

const cells = document.querySelectorAll('#cell-0, #cell-1, #cell-2, #cell-3, #cell-4, #cell-5, #cell-6, #cell-7, #cell-8')


const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.textContent = whoseTurn

        winningCombinations.forEach(combination => {
            const [a, b, c] = combination
            console.log('Gello')
            if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent && cells[a].textContent !== '') {
                alert(`${whoseTurn} wins!`)
                cells.forEach(cell => {
                    cell.textContent = ''
                })
            }
        })  

        if (whoseTurn === playerOne) {
            whoseTurn = playerTwo
        } else {
            whoseTurn = playerOne
        }

    
    })
})  



