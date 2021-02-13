interface sideType {
	$target: HTMLElement;
	score: number;
	lines: number;
	level: number;
}

interface sideState {
	score: number;
	lines: number;
	level: number,
}

export default class Side {
	readonly $side: HTMLElement;
	score: number;
	lines: number;
	level: number;

	constructor({ $target, score, lines, level }: sideType) {
		this.$side = document.createElement('div');
		this.$side.className = 'side';
		$target.append(this.$side);

		this.score = score;
		this.lines = lines;
		this.level = level;
		this.render();
	}

	setState({ score, lines, level }: sideState) {
		this.score = score;
		this.lines = lines;
		this.level = level;
		this.render();
	}

	render() {
		this.$side.innerHTML = `
			<h1 class="title">TETRIS</h1>
			<div class="score-container">
				<p>Score: ${this.score}</p>
				<p>Lines: ${this.lines}</p>
				<p>Level: ${this.level}</p>
			</div>
		`
	}
}