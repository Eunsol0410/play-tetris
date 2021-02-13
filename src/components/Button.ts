interface buttonType {
	$target: HTMLElement;
	onPlayClick: () => {};
	isPlaying: boolean;
}

enum playing {
	on = 'Finish',
	off = 'Play'
}

export default class Button {
	readonly $button: HTMLElement;
	$playBtn: HTMLElement;
	isPlaying: boolean;
	onPlayClick : () => void;

	constructor({ $target, isPlaying, onPlayClick }: buttonType) {
		this.$button = document.createElement('div');
		this.$button.className = 'btn-container';
		$target.append(this.$button);

		this.isPlaying = isPlaying;
		this.onPlayClick = onPlayClick;
		this.render();
	}

	setIsPlaying(isPlaying: boolean) {
		this.isPlaying = isPlaying;
		if(this.isPlaying) this.$playBtn.innerHTML = playing.on;
		else this.$playBtn.innerHTML = playing.off;
	}

	render() {
		this.$button.innerHTML = `
			<button class="play-btn">${this.isPlaying ? playing.on : playing.off}</button>
		`
		this.$playBtn = this.$button.querySelector('.play-btn');
		this.$playBtn.addEventListener('click', this.onPlayClick);
	}
}