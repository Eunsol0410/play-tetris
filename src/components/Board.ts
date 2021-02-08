import { colors } from '../utils/pieces';
import { getRandomNumber } from '../utils/utils'; 
import Piece, { positionType } from './Piece';

interface boardType {
	$target: HTMLElement;
	level: number;
	clearLine: (line: number) => {};
	endGame: () => {};
}

export const ROWS = 20;
export const COLS = 10;
const LEN = 30;
const TYPES = 7;

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
	speed: number;
	board: number[][];
	timer: number;
	animationId: number;
	clearLine: (line: number) => {};
	endGame: () => {};
	nextType : number;
	
	constructor({ $target, level, clearLine, endGame }: boardType) {
		this.$board = document.createElement('canvas');
		this.$board.className = 'board-container';
		$target.append(this.$board);
		document.addEventListener('keydown', this.onKeyDown.bind(this));

		this.setSpeed(level);
		this.clearLine = clearLine;
		this.endGame = endGame;
		this.context = this.$board.getContext('2d');
		this.context.canvas.width = COLS*LEN;
		this.context.canvas.height = ROWS*LEN;
		this.context.scale(LEN, LEN);
		this.nextType = getRandomNumber(TYPES);

		this.init();
	}

	init() {
		this.board = Array.from({length: ROWS}, () => new Array(COLS).fill(0));
		this.pieceObj = null;
		this.clearBoard();
	}

	setSpeed(level: number) {
		this.speed = level > 15 ? 100 : 200 - level*10;
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

		if (this.timer > this.speed) {
			this.onKeyDown({ code: KeyType.ArrowDown });
			this.timer = 0;
		}

		this.animationId = requestAnimationFrame(this.run.bind(this));
	}

	addPiece() {
		this.pieceObj = new Piece({
			context: this.context,
			type: this.nextType,
			isEmpty: this.isEmptyPosition.bind(this),
			fixPiece: this.fixPiece.bind(this)
		});

		this.nextType = getRandomNumber(TYPES);
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
		
		const isEnd = this.board[0].find(v => v !== 0);
		if (isEnd) {
			this.endGame();
		} else {
			this.checkClear();
			this.addPiece();
		}
	}

	checkClear() {
		const nextBoard = Array.from({length: ROWS}, () => new Array(COLS).fill(0));
		let cnt = 0;

		for(let i=ROWS-1; i>=0; i--) {
			if(this.board[i].indexOf(0) === -1) {
				cnt += 1;
			} else {
				nextBoard[i + cnt] = this.board[i];
			}
		}

		if(cnt > 0) {
			this.clearLine(cnt);
			this.board = nextBoard;
		}
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

	onKeyDown({ code }: { code: KeyType}) {
		if (!(code in KeyType) || !this.pieceObj) return;
		this.clearBoard();

		if (code === KeyType.ArrowUp) {
			this.pieceObj.rotateRight();
		} else if (code === KeyType.Space) {
			while(true) {
				if(!this.pieceObj.move(KeyType.ArrowDown)) break;
			}
		} else {
			this.pieceObj.move(code as KeyType);
		}

		if (this.pieceObj) {
			this.pieceObj.draw();
			this.drawBoard();			
		}
	}
}