class OverScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'OverScene',
		});
	}

	preload() {}

	create() {
		this.add.image(0, 0, 'sky').setOrigin(0);
	}

	update() {}
}

export default OverScene;
