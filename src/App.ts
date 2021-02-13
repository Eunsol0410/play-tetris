import './styles/main.css';
import Board from './components/Board';
import Side from './components/Side';
import Button from './components/Button';
import Ending from './components/Ending';
import Setting from './components/Setting';
import Sound from './components/Sound';

export default class App {
	readonly $app: HTMLElement;
	readonly boardObj: Board;
	readonly sideObj: Side;
	readonly buttonObj: Button;
	readonly endingObj: Ending;
	readonly settingObj: Setting;
	readonly soundObj: Sound;
	isPlaying: boolean;
	score: number;
	lines: number;
	level: number;
	startLevel: number;
	muted: boolean;

	constructor($target: HTMLElement) {
		this.$app = document.createElement('div');
		this.$app.className = 'main';
		$target.append(this.$app);

		this.startLevel = 1;
		this.muted = true;
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
			setStartLevel: this.setStartLevel.bind(this),
			muted: this.muted,
			setMuted: this.setMuted.bind(this)
		})

		this.soundObj = new Sound({
			$target: this.$app,
			muted: this.muted
		});
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

	setMuted(muted: boolean) {
		this.muted = muted;
		this.soundObj.setMuted(muted);
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
		this.soundObj.play();
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
		this.soundObj.stop();
	}
}
