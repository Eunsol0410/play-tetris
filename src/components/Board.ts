import { colors } from '../utils/pieces';

const ROWS = 20;
const COLS = 10;
const LEN = 32;

const LEN = 30;

export enum KeyType {
	ArrowLeft = "ArrowLeft",
	ArrowRight = "ArrowRight",
	ArrowDown = "ArrowDown",
	ArrowUp = "ArrowUp",
	Space = "Space"
}

export default class Board {
	readonly $board: HTMLCanvasElement;
	readonly context: CanvasRenderingContext2D;
	pieceObj: Piece;
	board: number[][];

	constructor($target: Element) {
		this.$board = document.createElement('canvas');
		this.$board.className = 'board-container';
		$target.append(this.$board);
		document.addEventListener('keydown', this.onKeyDown.bind(this));

		this.context = this.$board.getContext('2d');
		this.context.scale(LEN, LEN/4);

		this.init();
	}

	init() {
		this.board = Array.from({length: ROWS}, () => new Array(COLS).fill(0));
		this.pieceObj = null;
		this.clearBoard();
	}

	clearBoard() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	drawBoard() {
		this.board.forEach((line, r) => {
			line.forEach((type, c) => {
				if(type > 0) {
					this.context.fillStyle = colors[type];
					this.context.fillRect(c, r, 1, 1);
				}
			})
		})
	}

	onKeyDown(e: KeyboardEvent) {
		if(!(e.code in KeyType) || !this.pieceObj) return;
		e.stopPropagation();
			
		if(e.code === KeyType.ArrowUp) {
			this.clearBoard();
			this.pieceObj.rotateRight();
			this.pieceObj.draw();
		} else if (e.code === KeyType.Space) {
			// TODO: 조각 수직 이동
		} else {
			this.clearBoard();
			this.pieceObj.move(e.code as KeyType);
			this.pieceObj.draw();
		}

		this.drawBoard();
}
}