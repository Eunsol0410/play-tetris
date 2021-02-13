import './styles/main.css';
import Board from './components/Board';
import Side from './components/Side';
import Button from './components/Button';
import Ending from './components/Ending';
import Setting from './components/Setting';

export default class App {
	readonly $app: HTMLElement;
	readonly boardObj: Board;
	readonly sideObj: Side;
	readonly buttonObj: Button;
	readonly endingObj: Ending;
	readonly settingObj: Setting;
	isPlaying: boolean;
	score: number;
	lines: number;
	level: number;
	startLevel: number;

	constructor($target: HTMLElement) {
		this.$app = document.createElement('div');
		this.$app.className = 'main';
		$target.append(this.$app);

		this.startLevel = 1;
		this.init();

		this.boardObj = new Board({
			$target: this.$app,
			level: this.level,
			clearLine: this.clearLine.bind(this),
			endGame: this.onPlayClick.bind(this)
		});
		
		this.sideObj = new Side({
			$target: this.$app,
			score: this.score,
			lines: this.lines,
			level: this.level,
		});
		
		this.buttonObj = new Button({
			$target: this.$app,
			onPlayClick: this.onPlayClick.bind(this),
			onSettingClick: this.onSettingClick.bind(this),
			isPlaying: this.isPlaying
		});

		this.endingObj = new Ending({
			$target: this.$app
		});

		this.settingObj = new Setting({
			$target: this.$app,
			startLevel: this.startLevel,
			setStartLevel: this.setStartLevel.bind(this)
		})
	}

	init() {
		this.isPlaying = false;
		this.score = 0;
		this.lines = 0;
		this.level = this.startLevel;
	}

	setStartLevel(level: number) {
		this.startLevel = level;
		this.resetGame();
	}

	clearLine(line: number) {
		this.lines += line;
		this.score += this.level * line;
		if(this.lines >= 10) {
			this.lines = 0;
			this.level += 1;
		}
		this.boardObj.setSpeed(this.level);
		this.sideObj.setState({
			score: this.score,
			lines: this.lines,
			level: this.level,
		});
	}

	onPlayClick() {
		if(this.isPlaying) {
			this.resetGame();
		} else {
			this.startGame();
		}
		this.endingObj.setIsHidden(this.isPlaying);
	}
	
	onSettingClick() {
		this.settingObj.toggleIsOpened();
	}

	startGame() {
		this.isPlaying = true;
		this.buttonObj.setIsPlaying(this.isPlaying);
		this.boardObj.start();
	}
	
	resetGame() {
		this.init();
		this.sideObj.setState({
			score: this.score,
			lines: this.lines,
			level: this.level,
		});
		
		this.isPlaying = false;
		this.buttonObj.setIsPlaying(this.isPlaying);
		this.boardObj.finish();
	}
}
