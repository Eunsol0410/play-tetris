import background from '../assets/background.mp3';

interface soundType {
	$target: HTMLElement;
	muted: boolean
}

export default class Sound {
	readonly $sound: HTMLAudioElement;
	muted: boolean;

	constructor({ $target, muted }: soundType) {
		this.$sound = new Audio(background);
		this.$sound.className = 'background-audio';
		this.$sound.loop = true;
		$target.append(this.$sound);

		this.muted = muted;
		this.$sound.muted = this.muted;
	}

	setMuted(muted: boolean) {
		this.muted = muted;
		this.$sound.muted = muted;
	}

	play() {
		this.$sound.play();
	}

	stop() {
		this.$sound.pause();
	}
}
