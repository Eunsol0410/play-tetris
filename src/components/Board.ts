import { colors } from '../utils/pieces';
import Piece, { positionType } from './Piece';

interface boardType {
	$target: Element;
	level: number;
	clearLine: (line: number) => {};
}

export const ROWS = 20;
export const COLS = 10;
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
	timer: number;
	animationId: number;

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

	start() {
		this.addPiece();
		this.pieceObj.draw();
		this.run();
	}

	finish() {
		this.init();
		cancelAnimationFrame(this.animationId);
	}
	
	run() {
		this.timer += 1;

		if(this.timer > 200 - this.level*10) {
		this.clearBoard();
			this.pieceObj.move(KeyType.ArrowDown);
			this.pieceObj.draw();
			this.drawBoard();
			this.timer = 0;
		}

		this.animationId = requestAnimationFrame(this.run.bind(this));
	}

	addPiece() {
		this.pieceObj = new Piece({
			context: this.context,
			isEmpty: this.isEmptyPosition.bind(this),
			fixPiece: this.fixPiece.bind(this)
		});
		this.timer = 0;
	}

	isEmptyPosition(p:positionType) {
		return this.board[p.y][p.x] === 0;
	}

	fixPiece(shape: number[][], position: positionType) {
		shape.forEach((line, r) => {
			line.forEach((type, c) => {
				if(type > 0) {
					this.board[position.y + r][position.x + c] = type;
				}
			})
		})
		this.addPiece();
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
		this.clearBoard();
			
		if(e.code === KeyType.ArrowUp) {
			this.pieceObj.rotateRight();
		} else if (e.code === KeyType.Space) {
			while(true) {
				if(!this.pieceObj.move(KeyType.ArrowDown)) break;
			}
		} else {
			this.pieceObj.move(e.code as KeyType);
		}

		this.pieceObj.draw();
		this.drawBoard();
}
}