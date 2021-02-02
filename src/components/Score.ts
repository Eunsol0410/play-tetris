export default class Score {
	readonly $score: Element;
	score: Number;
	lines: Number;
	level: Number;

	constructor($target: Element) {
		this.$score = document.createElement('div');
		this.$score.className = 'score-container';
		$target.append(this.$score);

		this.init();
		this.render();
	}

	init() {
		this.score = 0;
		this.lines = 0;
		this.level = 0;
	}

	render() {
		this.$score.innerHTML = `
			<h1 class="title">TETRIS</h1>
			<div class="score-container">
				<p>Score: ${this.score}</p>
				<p>Lines: ${this.lines}</p>
				<p>Level: ${this.level}</p>
			</div>
		`
	}
}