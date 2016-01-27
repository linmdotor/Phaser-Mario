Text = function(game) {

	this.game = game;
	this.score = 0;
	this.game.load.bitmapFont('snes', 'assets/font/mario20_0.png', 'assets/font/mario20.fnt');
	this.game.load.image('empty', 'assets/images/empty.png');

}

Text.prototype.create = function() {

	this.layerGUI = this.game.add.group();
	this.rootGUI = this.layerGUI.add(new Phaser.Sprite(this.game, 0, 0, "empty"));
	this.rootGUI.fixedToCamera = true;

	// TEXTO a la izquierda "MARIO" con el número de monedas (score) debajo
	var marioLabel = this.game.add.bitmapText(64,16,'snes', 'MARIO', 20);
	this.rootGUI.addChild(marioLabel);

	this.scoreText = this.game.add.bitmapText(90, 50, 'snes', '0', 20);
	this.rootGUI.addChild(this.scoreText);

	this.moneda = this.game.add.sprite(44, 42, 'moneda');
	this.rootGUI.addChild(this.moneda);

	// TEXTO a la derecha el tiempo "TIME", 400 segundos que decrecerán
	var timeLabel = this.game.add.bitmapText(this.game.world.width - 154, 16, 'snes', 'TIME', 20);
	this.rootGUI.addChild(timeLabel);

	this.timeText = this.game.add.bitmapText(this.game.world.width - 140, 50, 'snes', '0', 20);
	this.rootGUI.addChild(this.timeText);

	this.inittime = this.game.time.now;

}

Text.prototype.update = function() {

	// Actualizar this.timeText
	dif = (game.time.now - this.inittime)/1000;
	this.timeText.setText(''+(400-Math.floor(dif)));

}

Text.prototype.addscore = function(points) {

	// Actualizar this.score y this.scoreText
	this.score += 100;
	this.scoreText.setText(''+this.score);

}