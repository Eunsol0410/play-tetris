import { scoreState } from '../App';

interface scoreType {
	$target: Element;
	score: number;
	lines: number;
	level: number;
}

export default class Score {
	readonly $score: Element;
	score: number;
	lines: number;
	level: number;

	constructor({ $target, score, lines, level }: scoreType) {
		this.$score = document.createElement('div');
		this.$score.className = 'score-container';
		$target.append(this.$score);

		this.render({score, lines, level});
	}

	render({ score, lines, level }: scoreState) {
		this.$score.innerHTML = `
			<h1 class="title">TETRIS</h1>
			<div class="score-container">
				<p>Score: ${score}</p>
				<p>Lines: ${lines}</p>
				<p>Level: ${level}</p>
			</div>
		`
	}
}