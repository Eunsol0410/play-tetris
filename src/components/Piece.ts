import { colors, shapes } from '../utils/pieces';
import { getRandomNumber } from '../utils/utils'; 
import { KeyType } from './Board';

interface pieceType {
	context: CanvasRenderingContext2D;
}

interface positionType {
	x: number;
	y: number;
}

export default class Piece {
	readonly context: CanvasRenderingContext2D;
	color: string; 
	shape: number[][]; 
	position: positionType;

	constructor({ context }: pieceType) {
		this.context = context;
		const type = getRandomNumber(shapes.length);
		this.color = colors[type];
		this.shape = shapes[type];
		this.position = { x: 3, y: 0 };
		this.draw();
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
		if(KEY === KeyType.ArrowLeft) this.position = { ...this.position, x: this.position.x - 1 };
		else if(KEY === KeyType.ArrowRight) this.position = { ...this.position, x: this.position.x + 1 };
		else if(KEY === KeyType.ArrowDown) this.position = { ...this.position, y: this.position.y + 1 };
	}
}