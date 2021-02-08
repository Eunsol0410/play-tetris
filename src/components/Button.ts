interface buttonType {
	$target: HTMLElement;
	onClick: () => {};
	isPlaying: boolean;
}

export default class Button {
	readonly $button: HTMLElement;
	isPlaying: boolean;

	constructor({ $target, onClick, isPlaying }: buttonType) {
		this.$button = document.createElement('button');
		this.$button.className = 'play-btn';
		$target.append(this.$button);

		this.isPlaying = isPlaying;
		this.$button.addEventListener('click', onClick);
		this.render();
	}

	setState(isPlaying: boolean) {
		this.isPlaying = isPlaying;
		this.render();
	}

	render() {
		if(this.isPlaying) this.$button.innerHTML = 'Finish';
		else this.$button.innerHTML = 'Play';
	}
}