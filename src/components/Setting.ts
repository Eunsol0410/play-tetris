enum theme {
	dark = 'dark',
	light = 'light'
}

interface settingType {
	$target: HTMLElement;
	startLevel: number;
	setStartLevel: (level: number) => void;
}

export default class Setting {
	readonly $setting: HTMLElement;
	$close: HTMLElement;
	$theme: HTMLInputElement;
	isOpened: boolean;
	theme: theme;
	sound: boolean;
	level: number;
	setStartLevel: (level: number) => void;

	constructor({ $target, startLevel, setStartLevel }: settingType) {
		this.$setting = document.createElement('div');
		this.$setting.className = 'setting-container';
		$target.append(this.$setting);

		this.theme = window.matchMedia("(prefers-color-scheme: dark)").matches 
			? theme.dark : theme.light;
		document.documentElement.setAttribute('data-theme', this.theme);
		
		this.isOpened = false;
		this.sound = false;
		this.level = startLevel;
		this.setStartLevel = setStartLevel;
		this.render();
	}

	toggleIsOpened() {
		this.isOpened = !this.isOpened;
		if(this.isOpened) {
			this.$setting.style.display = 'flex';
		} else {
			this.$setting.style.display = 'none';
		}
	}

	toggleTheme() {
		this.theme = this.theme === theme.dark ? theme.light : theme.dark;
		document.documentElement.setAttribute('data-theme', this.theme);
		if(this.theme === theme.dark) {
			this.$theme.checked = true;
		} else {
			this.$theme.checked = false;
		}
	}

	render() {
		const darkChecked = this.theme === theme.dark ? 'checked' : '';
		const soundChecked = this.sound ? 'checked' : '';
		this.$setting.innerHTML = `
			<div class="setting">
				<button class="close-btn">X</button>
				<label for="theme">Dark Mode On </label>
				<input class="theme" type="checkbox" name="theme" value="dark" ${darkChecked}>
				<label for="sound">Sound On </label>
				<input class="sound" type="checkbox" name="sound" value="on" ${soundChecked}>
				<p>Level</p>
				<section class="level-container">
					<button class="levelUp-btn">▼</button>
					<p class="level">${this.level}</p>
					<button class="levelDown-btn">▲</button>
				</section>
			</div>
		`;

		if(!this.isOpened)	this.$setting.style.display = 'none';
		
		this.$close = this.$setting.querySelector('.close-btn');
		this.$close.addEventListener('click', this.toggleIsOpened.bind(this));

		this.$theme = this.$setting.querySelector('.theme');
		this.$theme.addEventListener('click', this.toggleTheme.bind(this));
	}
}