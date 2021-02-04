import Piece from './Piece';

const ROWS = 20;
const COLS = 10;
const LEN = 32;
export default class Board {
	readonly $board: HTMLCanvasElement;
	readonly context: CanvasRenderingContext2D;
	piece: Piece;
	board: number[][];

	constructor($target: Element) {
		this.$board = document.createElement('canvas');
		this.$board.className = 'board-container';
		$target.append(this.$board);
		this.context = this.$board.getContext('2d');
		this.context.scale(LEN, LEN/4);

		this.init();
	}

	init() {
		this.board = Array.from({length: ROWS}, () => new Array(COLS).fill(0));
		this.piece = null;
		this.clearBoard();
	}

	clearBoard() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	play() {
		this.piece = new Piece({
			context: this.context
		})
	}
}