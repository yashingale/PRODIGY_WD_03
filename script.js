let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let gameMode = 0; // 0: Player vs Player, 1: Player vs Computer
let player1Score = 0;
let player2Score = 0;
let computerScore = 0;

function startGame(mode) {
    gameMode = mode;
    document.getElementById('game-mode').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('scoreboard').style.display = 'block';
}

function makeMove(index) {
    if (!gameOver && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        checkWinner();
        if (!gameOver) {
            if (gameMode === 0) {
                togglePlayer();
            } else {
                makeComputerMove();
            }
        }
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            document.getElementById('result').innerText = `${currentPlayer} wins!`;
            updateScore(currentPlayer);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        document.getElementById('result').innerText = 'It\'s a draw!';
    }
}

function makeComputerMove() {
    // Simple AI: Randomly choose an empty cell
    let emptyCells = gameBoard.reduce((acc, val, index) => {
        if (val === '') acc.push(index);
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let computerMove = emptyCells[randomIndex];
    gameBoard[computerMove] = currentPlayer;
    document.getElementsByClassName('cell')[computerMove].innerText = currentPlayer;
    checkWinner();
    if (!gameOver) togglePlayer();
}

function updateScore(winner) {
    if (winner === 'X') {
        player1Score++;
        document.getElementById('player1-score').querySelector('span').innerText = player1Score;
    } else if (winner === 'O') {
        if (gameMode === 0) {
            player2Score++;
            document.getElementById('player2-score').querySelector('span').innerText = player2Score;
        } else {
            computerScore++;
            document.getElementById('computer-score').querySelector('span').innerText = computerScore;
        }
    }
}
