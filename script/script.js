const gameController = (() => {
    const resetButton = document.querySelector(".game-reset");
    let xTurn = true;
    gameover = false;

    const reset = () => {
        gameBoard.init();
        xTurn = true;
        gameover = false;
        displayController.setMessage("X's turn");
    };

    (() => {
        resetButton.addEventListener("click", reset);
    })();

    const clickHandler = target => {
        if (gameover) {
            return;
        }
        xTurn ? gameBoard.addX(target.id) : gameBoard.addO(target.id);
        if (checkWin()) {
            displayController.setMessage(`${xTurn ? "X wins!" : "O wins!"}`);
            gameover = true;
            return;
        }
        if (![...Object.values(gameBoard.getGameGrid())].includes("")) {
            displayController.setMessage("It's a tie!");
            gameover = true;
            return;
        }
        xTurn = !xTurn;
        displayController.setMessage(`${xTurn ? "X's turn" : "O's turn"}`);
    };

    const checkRows = () => {
        let row = ["", "", ""];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                row[j] = gameBoard.getGameGrid()[i * 3 + j];
            }
            if (
                row.filter(symbol => symbol === "X").length === 3 ||
                row.filter(symbol => symbol === "O").length === 3
            ) {
                return true;
            }
            row = ["", "", ""];
        }
        return false;
    };

    const checkCols = () => {
        let col = ["", "", ""];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                col[j] = gameBoard.getGameGrid()[j * 3 + i];
            }
            if (
                col.filter(symbol => symbol === "X").length === 3 ||
                col.filter(symbol => symbol === "O").length === 3
            ) {
                return true;
            }
            col = ["", "", ""];
        }
        return false;
    };

    const checkDiag = () => {
        let diag1 = [0, 4, 8].map(index => gameBoard.getGameGrid()[index]);
        let diag2 = [2, 4, 6].map(index => gameBoard.getGameGrid()[index]);
        if (
            diag1.filter(symbol => symbol === "X").length === 3 ||
            diag1.filter(symbol => symbol === "O").length === 3 ||
            diag2.filter(symbol => symbol === "X").length === 3 ||
            diag2.filter(symbol => symbol === "O").length === 3
        ) {
            return true;
        }
        return false;
    };

    const checkWin = () => {
        if (checkRows()) {
            return true;
        }
        if (checkCols()) {
            return true;
        }
        if (checkDiag()) {
            return true;
        }
        return false;
    };

    return { clickHandler };
})();

const gameBoard = (() => {
    const gameGrid = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
    };

    const init = () => {
        for (const key in gameGrid) {
            gameGrid[key] = "";
        }
        displayController.drawGameGrid();
    };

    const getGameGrid = () => gameGrid;

    const addX = position => {
        gameGrid[position] = "X";
        displayController.setX(position);
    };

    const addO = position => {
        gameGrid[position] = "O";
        displayController.setO(position);
    };

    return { init, getGameGrid, addX, addO };
})();

const displayController = (() => {
    const statusBar = document.querySelector(".status-bar");
    const gameGrid = document.querySelector(".game-grid");

    const init = (() => {
        const tiles = gameBoard.getGameGrid();
        for (key in tiles) {
            const tile = document.createElement("div");
            tile.classList.add("game-grid__tile");
            tile.id = key;
            tile.addEventListener("click", e =>
                gameController.clickHandler(e.target)
            );
            gameGrid.appendChild(tile);
        }
    })();

    const gameTiles = document.querySelectorAll(".game-grid__tile");

    const drawGameGrid = () => {
        gameTiles.forEach(tile => {
            tile.textContent = gameBoard.getGameGrid()[tile.id];
        });
    };

    const setMessage = message => {
        statusBar.textContent = message;
    };

    const setX = position => {
        gameTiles[position].textContent = "X";
    };

    const setO = position => {
        gameTiles[position].textContent = "O";
    };

    return { drawGameGrid, setMessage, setX, setO };
})();

const playerFactory = () => {};
displayController.setMessage("X's turn");
gameBoard.init();
