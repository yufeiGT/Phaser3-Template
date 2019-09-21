import 'phaser';
import GameScene from './scenes/GameScene';
import OverScene from './scenes/OverScene';

const game = new Phaser.Game({
	type: Phaser.AUTO,
	pixelArt: true,
	roundPixels: true,
	parent: 'content',
	width: 800,
	height: 600,
	// 物理引擎
	physics: {
		default: 'arcade',
		arcade: {
			// 重力设置
			gravity: {
				y: 1000,
			},
			debug: false,
		},
	},
	// 场景
	scene: [
		GameScene,
		OverScene,
	],
});