import './style.css';

// OBJECT: Gameboard IIFE
const Gameboard = (function () {
	'use strict';

	// _gameboard: logical representation of the tic tac toe gameboard
	// _gameboard_cells: visually represents the values stored in the logical gameboard
	const _gameboard = Array.from(Array(9).keys());
	const _gameboard_cells = document.querySelectorAll('[data-cell-id]');
	let _marked_cells = 0;

	function get_gameboard() {
		return _gameboard;
	}
	function get_cells() {
		return _gameboard_cells;
	}

	function display_gameboard() {
		for (let i = 0; i < _gameboard.length; i++) {
			_gameboard_cells[i].innerText = _gameboard[i];
		}
	}

	function reset_board() {
		_marked_cells = 0;
		_gameboard_cells.forEach((cell) => {
			cell.innerText = '';
		});
	}
	function mark_cell(gameboardCell, currentPlayer) {
		gameboardCell.classList.add(currentPlayer.get_symbol());
		gameboardCell.innerText = currentPlayer.get_symbol();
		_marked_cells++;
	}

	function all_cells_marked() {
		return _marked_cells === _gameboard.length;
	}

	return {
		get_gameboard,
		get_cells,
		display_gameboard,
		reset_board,
		mark_cell,
		all_cells_marked,
	};
})();
/* ========================================================= */
// OBJECT: Player Factory
const Player = function (name, playerSymbol) {
	// Public methods
	function get_name() {
		return name;
	}
	function get_symbol() {
		return playerSymbol;
	}

	return {
		get_name,
		get_symbol,
	};
};

/* ========================================================= */
// OBJECT: Flow of game controls
/* ========================================================= */
const Game = (function (player1, player2) {
	'use strict';
	const startButton = document.getElementById('startButton');
	const restartButton = document.getElementById('restartButton');
	const X_SYMBOL = 'X';
	const O_SYMBOL = 'O';
	const playerOne = Player(player1, X_SYMBOL);
	const playerTwo = Player(player2, O_SYMBOL);
	let X_TURN = true;
	const WINNING_COMBOS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	startButton.addEventListener('click', startGame);
	restartButton.addEventListener('click', () => {
		DisplayController.close_modal()
		startGame()
	});

	// Fuctions
	function startGame() {
		restartButton.classList.remove('hide-button');
		startButton.classList.add('hide-button');
		Gameboard.reset_board();

		/* EVENT LISTENERS */
		Gameboard.get_cells().forEach((cell) => {
			cell.classList.remove(`${X_SYMBOL}`);
			cell.classList.remove(`${O_SYMBOL}`);
			cell.addEventListener('click', handle_click, { once: true });
		});
	}

	function handle_click(e) {
		let gameboardCell = e.target;

		// Find out who clicked?
		let currentPlayer;
		if (X_TURN) {
			currentPlayer = playerOne;
		} else {
			currentPlayer = playerTwo;
		}

		// Add text and class to marked cell
		Gameboard.mark_cell(gameboardCell, currentPlayer);

		// Check if you won or lost
		let win = check_win(currentPlayer);
		if (win) {
			end_game(currentPlayer);
		} else if (Gameboard.all_cells_marked()) {
			end_game('DRAW');
		} else {
			// Swap players turn
			X_TURN = !X_TURN;
		}
	}

	function check_win(currentPlayer) {
		return WINNING_COMBOS.some((combination) => {
			return combination.every((index) => {
				return Gameboard.get_cells()[index].classList.contains(currentPlayer.get_symbol());
			});
		});
	}

	function end_game(winner) {
		Gameboard.get_cells().forEach((cell) => {
			cell.removeEventListener('click', handle_click);
		});

		console.log('Game Over');
		if (winner === 'DRAW') {
			DisplayController.display_message("It's A Draw");
		} else {
			DisplayController.display_message(`${winner.get_name()} is the Winner`);
		}
	}
	// 1. Perform intial processing
	// 2. Processing module inside loop
	// 3. Final Processing Moudle-
	return { startGame };
})('player1', 'player2');

const DisplayController = (function () {
	const modal = document.getElementById('modal');
	const closeButton = document.getElementById('closeButton');
	const modalMessage = document.getElementById('modalMessage');

	window.addEventListener('click', outside_click);
	closeButton.addEventListener('click', close_modal);

	function outside_click(e) {
		console.log(e.target);
		if (e.target === modal) {
			close_modal();
		}
	}

	function display_message(msg) {
		modal.classList.add('active');
		modalMessage.innerText = msg;
	}

	function close_modal() {
		modal.classList.remove('active');
	}

	return { display_message, close_modal };
})();
