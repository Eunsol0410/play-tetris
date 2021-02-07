import './styles/main.css';
import Board from './components/Board';
import Score from './components/Score';
import Button from './components/Button';

export interface scoreState {
	score: number;
	lines: number;
	level: number,
}

export default class App {
	readonly $app: Element;
	readonly boardObj: Board;
	readonly scoreObj: Score;
	readonly buttonObj: Button;
	isPlaying: boolean;
	score: number;
	lines: number;
	level: number;

	constructor($target: Element) {
		this.$app = document.createElement('div');
		this.$app.className = 'main';
		$target.append(this.$app);
		this.init();

		this.boardObj = new Board({
			$target: this.$app,
			level: this.level,
			clearLine: this.clearLine.bind(this)
		});

		this.scoreObj = new Score({
			$target: this.$app,
			score: this.score,
			lines: this.lines,
			level: this.level,
		});
		
		this.buttonObj = new Button({
			$target: this.$app,
			onClick: this.onClick.bind(this)
		});
	}

	init() {
		this.isPlaying = false;
		this.score = 0;
		this.lines = 0;
		this.level = 1;
	}

	clearLine(line: number) {
		this.lines += line;
		this.score += this.level * line;
		if(this.lines >= 10) {
			this.lines = 0;
			this.level += 1;
		}
		this.boardObj.setSpeed(this.level);
		this.scoreObj.render({ score: this.score, lines: this.lines, level: this.level });
	}

	onClick() {
		this.isPlaying = !this.isPlaying;
		this.buttonObj.render(this.isPlaying);
		
		if(this.isPlaying) {
			this.boardObj.start();
		} else {
			this.boardObj.finish();
		}
	}
}
