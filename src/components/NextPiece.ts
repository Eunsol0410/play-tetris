import { colors, shapes } from '../utils/pieces';
import Piece from './Piece';

interface nextPieceType {
	$target: HTMLElement;
}

export const LEN = 20;

export default class NextPiece {
	readonly $next: HTMLCanvasElement;
	readonly context: CanvasRenderingContext2D;
	color: string; 
	shape: number[][]; 
	pieceObj: Piece;

	constructor({ $target }: nextPieceType) {
		this.$next = document.createElement('canvas');
		this.$next.className = 'nextPiece-container';
		$target.append(this.$next);

		this.context = this.$next.getContext('2d');
		this.context.canvas.width = LEN*4;
		this.context.canvas.height = LEN*2;
		this.context.scale(LEN, LEN);
	}

	setType(type: number) {
		this.color = colors[type+1];
		this.shape = shapes[type];
	}

	draw() {
		this.erase();
		this.context.fillStyle = this.color;
		this.shape.forEach((line, r) => {
			line.forEach((type, c) => {
				if(type > 0) {
					this.context.fillRect(c, r, 1, 1);
				}
			})
		})
	}

	erase() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}
}