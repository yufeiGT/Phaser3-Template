class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameScene',
		});
	}

	// 障碍物
	createPlatforms() {
		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, 'ground').setScale(2, 2).refreshBody();
		this.platforms.create(0, 400, 'ground');
		this.platforms.create(500, 300, 'ground');
		this.platforms.create(0, 200, 'ground');
		this.platforms.create(600, 150, 'ground');
	}

	// 人物
	createPlayer() {
		this.player = this.physics.add.sprite(100, 450, 'dude');
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		// 人物动画
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 0,
				end: 3,
			}),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'turn',
			frames: [{
				key: 'dude',
				frame: 4,
			}],
			frameRate: 20,
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 5,
				end: 8,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}

	// 星星/道具
	ceeateStar() {
		this.stars = this.physics.add.group({
			key: 'star',
			repeat: 11,
			setXY: {
				x: 20,
				y: 0,
				stepX: 70,
			},
		});
		this.stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));
	}

	// 预加载
	preload() {
		this.score = 0;
		this.gamerover = false;
		this.load.image('sky', 'assets/images/sky.png');
		this.load.image('star', 'assets/images/star.png');
		this.load.image('ground', 'assets/images/platform.png');
		this.load.image('bomb', 'assets/images/bomb.png');
		this.load.spritesheet('dude', 'assets/images/dude.png', {
			frameWidth: 32,
			frameHeight: 48,
		});
	}

	// 初始化
	create() {
		this.add.image(0, 0, 'sky').setOrigin(0);
		this.scoreText = this.add.text(16, 16, 'score: 0', {
			fontSize: '32px',
			fill: '#000',
		});
		this.createPlatforms();
		this.createPlayer();
		this.physics.add.collider(this.player, this.platforms);
		this.ceeateStar();
		this.physics.add.collider(this.stars, this.platforms);
		this.physics.add.overlap(this.player, this.stars, (player, star) => {
			star.disableBody(true, true);
			this.score++;
			this.scoreText.setText(`score: ${this.score}`);
			if (this.stars.countActive(true) === 0) {
				this.stars.children.iterate(child => {
					child.enableBody(true, child.x, 0, true, true);
				});
				let x = this.player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400),
					bomb = this.bombs.create(x, 16, 'bomb');
				bomb.setBounce(true);
				bomb.setCollideWorldBounds(true);
				bomb.setVelocityY(Phaser.Math.Between(-200, 200), 20);
				bomb.allowGravity = false;
			}
		}, null, this);
		// 遥控器
		this.cursors = this.input.keyboard.createCursorKeys();
		this.bombs = this.physics.add.group();
		this.physics.add.collider(this.bombs, this.platforms);
		this.physics.add.collider(this.player, this.bombs, () => {
			this.physics.pause();
			this.player.setTint(0xff0000);
			this.player.anims.play('turn');
			// this.gameover = true;
			this.scene.stop('GameScene');
			this.scene.start('GameScene');
		}, null, this);
	}

	// 游戏数据更新
	update() {
		if (this.gameover) return;
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-200);
			this.player.anims.play('left', true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(200);
			this.player.anims.play('right', true);
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-600);
		}
	}
}

export default GameScene;
