interface endingType {
	$target: HTMLElement;
}

export default class Ending {
	readonly $ending: HTMLElement;
	isHidden: boolean;

	constructor({ $target }: endingType) {
		this.$ending = document.createElement('p');
		this.$ending.className = 'ending-title';
		this.$ending.innerHTML = 'GAME OVER';
		$target.append(this.$ending);

		this.isHidden = true;
		this.render();
	}

	setState(isPlaying: boolean) {
		this.isHidden = isPlaying;
		this.render();
	}

	render() {
		if(this.isHidden) this.$ending.style.display = 'none';
		else	this.$ending.style.display = 'block';
	}
}