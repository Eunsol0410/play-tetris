export default class Board {
	readonly $board: Element;

	constructor($target: Element) {
		this.$board = document.createElement('div');
		this.$board.className = 'board-container';
		$target.append(this.$board);
	}
}