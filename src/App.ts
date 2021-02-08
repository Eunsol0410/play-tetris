import './styles/main.css';
import Board from './components/Board';
import Score from './components/Score';
import Button from './components/Button';
import Ending from './components/Ending';

export interface scoreState {
	score: number;
	lines: number;
	level: number,
}

export default class App {
	readonly $app: HTMLElement;
	readonly boardObj: Board;
	readonly scoreObj: Score;
	readonly buttonObj: Button;
	readonly endingObj: Ending;
	isPlaying: boolean;
	score: number;
	lines: number;
	level: number;

	constructor($target: HTMLElement) {
		this.$app = document.createElement('div');
		this.$app.className = 'main';
		$target.append(this.$app);
		this.init();

		this.boardObj = new Board({
			$target: this.$app,
			level: this.level,
			clearLine: this.clearLine.bind(this),
			endGame: this.onClick.bind(this)
		});

		this.scoreObj = new Score({
			$target: this.$app,
			score: this.score,
			lines: this.lines,
			level: this.level,
		});
		
		this.buttonObj = new Button({
			$target: this.$app,
			onClick: this.onClick.bind(this),
			isPlaying: this.isPlaying
		});

		this.endingObj = new Ending({
			$target: this.$app
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
		this.buttonObj.setIsPlaying(this.isPlaying);
		this.endingObj.setIsHidden(this.isPlaying);

		if(this.isPlaying) {
			this.boardObj.start();
		} else {
			this.boardObj.finish();
		}
	}
}
