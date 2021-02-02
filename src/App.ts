import "./styles/main.css";
import Board from './components/Board';
import Score from './components/Score';

export default class App {
	readonly $app: Element;
	readonly $board: Board;
	readonly $score: Score;

	constructor($target: Element) {
		this.$app = document.createElement('div');
		this.$app.className = 'main';
		$target.append(this.$app);

		this.$board = new Board(this.$app);
		this.$score = new Score(this.$app);

		this.$app.insertAdjacentHTML('beforeend', '<button class="play-btn">Play</button>')
	}
}
