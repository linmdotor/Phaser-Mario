Coins = function(texto) {

	game.load.image('moneda', 'assets/images/tiles/basement/6.gif');
	game.load.audio('snd_moneda', ['assets/audio/coin.mp3', 'assets/audio/coin.ogg']);
	this.text = texto;

}

Coins.prototype.create = function() {

	this.monedas = game.add.group();
	this.monedas.enableBody = true;

	// Crearemos 12 monedas
	for (var i = 0; i < 12; i++)
	{
		var coin = this.monedas.create(i * 70, 0, 'moneda');
		coin.body.gravity.y = 350;
		coin.body.gravity.x = (Math.random()-0.5)*100;
		coin.body.collideWorldBounds = true;
		coin.body.bounce.y = 0.5;
		coin.body.bounce.x = 1; //Rebote a los lados
	}

	this.snd_moneda = game.add.audio('snd_moneda');

}

Coins.prototype.update = function(plataformas, mario) {

	game.physics.arcade.collide(this.monedas,plataformas);

	this.mario = mario;
	if(mario.alive())
		game.physics.arcade.overlap(mario.sprite(), this.monedas, this.getmoneda, null, this);

}

Coins.prototype.getmoneda = function(spritemario, moneda) {

	moneda.kill();
	this.snd_moneda.play();

	this.text.addscore(100);

	this.creaReward(moneda.body.center.x,moneda.body.center.y);

}

Coins.prototype.creaReward = function(x, y) {

	reward = game.add.bitmapText(x,y,'snes','100', 20);
	timer = game.time.create(true);
	timer.repeat(10,50,
		function (reward) {
			reward.y-=2;
		},null,reward);

	timer.add(600,
		function (reward) {
			reward.destroy(true);
		},null,reward);

	timer.start();

}