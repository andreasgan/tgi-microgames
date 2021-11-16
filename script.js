function preload() {
	this.load.image('player', 'assets/repl.png');
}

function create() {
	// Register keys
	this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
	this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
	this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
	this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
	this.cursors = this.input.keyboard.createCursorKeys();

	// Special keybindings
	window.addEventListener("deviceorientation", handleOrientation.bind(this), true);

	// Player
	this.player = this.physics.add.image(50, 50, 'player').setScale(0.15, 0.15);
	this.player.setBounce(0.7, 0.7);
	this.player.setCollideWorldBounds(true);

	// Walls
	let wallSettings = [
		{x: 250, y: 400, width: 500, height: 50},
		{x: 0, y: 250, width: 50, height: 500},
		{x: 250, y: 0, width: 500, height: 50},
		{x: 500, y: 250, width: 50, height: 500},
		{x: 100, y: 150, width: 50, height: 300},
		{x: 300, y: 300, width: 50, height: 300},
	]
    this.wallGroup = this.physics.add.staticGroup();
	for (let wallSetting of wallSettings) {
		let wall = this.add.rectangle(wallSetting.x, wallSetting.y, wallSetting.width, wallSetting.height, 0x6666ff);
		this.wallGroup.add(wall);
	}
	
	// Goal
	this.goal = this.add.circle(400, 300, 50, 0xffaa66);

	// Collisions
    this.physics.add.collider(this.player, this.wallGroup);
    this.physics.add.overlap(this.player, this.goal, handleGoalOverlapping);
}

function handleGoalOverlapping() {
	this.add.text(config.width / 2, config.height / 2, 'Yeeeeeeeee', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
}

function handleOrientation(e) {
    var x = e.gamma;
    var y = e.beta;
    this.player.setVelocityX(this.player.body.velocity.x + x);
    this.player.setVelocityY(this.player.body.velocity.y + y);
}

function update() {
	if ((this.cursors.left.isDown || this.a.isDown) || (this.cursors.right.isDown || this.d.isDown)) {
		this.player.setVelocityX(this.cursors.left.isDown || this.a.isDown ? -160 : 160);
	}
	else {
		this.player.setVelocityX(0);
	}
	if (this.w.isDown && this.player.body.touching.down) {
		this.player.setVelocityY(-500)
	}
}

const config = {
	type: Phaser.AUTO,
	width: 500,
	height: 400,
	backgroundColor: '#f9f9f9',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 1500
			},
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

const game = new Phaser.Game(config);