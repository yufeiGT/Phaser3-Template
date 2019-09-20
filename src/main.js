import 'phaser';

const config = {
	type: Phaser.WEBGL,
	pixelArt: true,
	roundPixels: true,
	parent: 'content',
	width: 750,
	height: 1334,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 800
			},
			debug: false
		},
	},
	scene: [],
};

const game = new Phaser.Game(config);