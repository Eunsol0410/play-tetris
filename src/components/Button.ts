	$target: HTMLElement;
	onClick: () => {};
}

	readonly $button: HTMLElement;

	constructor({ $target, onClick }: boardType) {
		this.$button = document.createElement('button');
		this.$button.className = 'play-btn';
		$target.append(this.$button);

		this.$button.addEventListener('click', onClick);
		this.render(false);
	}

	render(isPlaying: boolean) {
		if(isPlaying) this.$button.innerHTML = 'Finish';
		else this.$button.innerHTML = 'Play';
	}
}