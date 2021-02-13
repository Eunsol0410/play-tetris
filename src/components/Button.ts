interface buttonType {
	$target: HTMLElement;
	onPlayClick: () => {};
	onSettingClick: () => {};
	isPlaying: boolean;
}

enum playing {
	on = 'Finish',
	off = 'Play'
}

export default class Button {
	readonly $button: HTMLElement;
	$settingBtn: HTMLElement;
	$playBtn: HTMLElement;
	isPlaying: boolean;
	onSettingClick: () => void;
	onPlayClick : () => void;

	constructor({ $target, isPlaying, onSettingClick, onPlayClick }: buttonType) {
		this.$button = document.createElement('div');
		this.$button.className = 'btn-container';
		$target.append(this.$button);

		this.isPlaying = isPlaying;
		this.onSettingClick = onSettingClick;
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
			<button class="setting-btn">Setting</button>
			<button class="play-btn">${this.isPlaying ? playing.on : playing.off}</button>
		`
		this.$settingBtn = this.$button.querySelector('.setting-btn');
		this.$settingBtn.addEventListener('click', this.onSettingClick);

		this.$playBtn = this.$button.querySelector('.play-btn');
		this.$playBtn.addEventListener('click', this.onPlayClick);
	}
}