import "./styles/main.css";
import Board from './components/Board';
import Score from './components/Score';
import Button from './components/Button';

export default class App {
	readonly $app: Element;
	readonly $board: Board;
	readonly $score: Score;
	readonly $button: Button;
	isPlaying: boolean;

	constructor($target: Element) {
		this.$app = document.createElement('div');
		this.$app.className = 'main';
		$target.append(this.$app);

		this.$board = new Board(this.$app);
		this.$score = new Score(this.$app);
		this.$button = new Button({
			$target: this.$app,
			onClick: this.onClick.bind(this)
		});
	}

	onClick() {
		this.isPlaying = !this.isPlaying;
		this.$button.render(this.isPlaying);
		
		if(this.isPlaying) {
			// TODO: Board Piece 채워지기 시작
		} else {
			// TODO: Board 초기화
			this.$score.init();
		}
	}
}
