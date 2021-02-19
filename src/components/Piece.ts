import { colors, shapes } from '../utils/pieces';
import { KeyType, ROWS, COLS } from './Board';

interface pieceType {
	context: CanvasRenderingContext2D;
	type: number;
	isEmpty: (p:positionType) => boolean;
	fixPiece: (shape: number[][], position: positionType) => {};
}

export interface positionType {
	x: number;
	y: number;
}

export default class Piece {
	readonly context: CanvasRenderingContext2D;
	color: string; 
	shape: number[][]; 
	position: positionType;
	expectedPosition: positionType;
	readonly isEmpty: (p:positionType) => boolean;
	readonly fixPiece: (shape: number[][], position: positionType) => {};

	constructor({ context, type, isEmpty, fixPiece }: pieceType) {
		this.context = context;
		this.color = colors[type+1];
		this.shape = shapes[type];
		this.position = { x: 3, y: 0 };
		this.isEmpty = isEmpty;
		this.fixPiece = fixPiece;
		this.setExpectedPosition();
	}
	
	draw() {
		this.context.fillStyle = this.color;
		this.shape.forEach((line, r) => {
			line.forEach((type, c) => {
				if(type > 0) {
					this.context.fillRect(this.position.x + c, this.position.y + r, 1, 1);
				}
			})
		})
	}
	
	move(KEY: KeyType) {
		let next;
		if(KEY === KeyType.ArrowLeft) next = { ...this.position, x: this.position.x - 1 };
		else if(KEY === KeyType.ArrowRight) next = { ...this.position, x: this.position.x + 1 };
		else if(KEY === KeyType.ArrowDown) next = { ...this.position, y: this.position.y + 1 };
		
		if(next && this.isValid(next, this.shape)) {
			this.position = next;
			if(KEY === KeyType.ArrowLeft || KEY === KeyType.ArrowRight) {
				this.setExpectedPosition();
			}
		} else if(KEY === KeyType.ArrowDown) {
			this.fixPiece(this.shape, this.position);
		}
	}

	setExpectedPosition() {
		const next = { ...this.position };
		while(true) {
			next.y += 1;
			if(!this.isValid(next, this.shape)) {
				next.y -= 1;
				break;
			}
		}
		this.expectedPosition = next;
	}

	rotateRight() {
		const length = this.shape.length;
		const next = Array.from({length}, () => new Array(length).fill(0));
		for(let i=0; i<length; i++) {
			for(let j=0; j<length; j++) {
				next[length - j - 1][i] = this.shape[i][j];
			}
		}

		if(this.isValid(this.position, next)) {
			this.shape = next;
			this.setExpectedPosition();
		}
	}

	isValid(position: positionType, shape: number[][]) {
		for(let r=0; r<shape.length; r++) {
			for(let c=0; c<shape.length; c++) {
				if(shape[r][c] > 0) {
					const p = { x: position.x + c, y: position.y + r };
					if(this.isOutOfRange(p) || !this.isEmpty(p)) return false;
				}
			}
		}

		return true;
	}

	isOutOfRange(p: positionType) {
		return p.x < 0 || p.y < 0 || p.x >= COLS || p.y >= ROWS; 
	}
}