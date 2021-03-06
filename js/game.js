var SuperMario = SuperMario || {};

SuperMario.Game = function(game) {

	this.game = game;

}

SuperMario.Game.prototype.preload = function() {

	game.load.image('fondo', 'assets/images/backgrounds/bg.gif');
	game.load.image('suelo', 'assets/images/backgrounds/suelo.gif');
	game.load.image('plataforma', 'assets/images/backgrounds/plataforma.gif');


	game.load.audio('snd_game', ['assets/music/music_main.mp3', 'assets/music/music_main.ogg']);
	game.load.audio('snd_die', ['assets/music/music_die.mp3', 'assets/music/music_die.ogg']);


	this.mario = new Mario();
	
	this.hud = new Text(game);

	this.goomba = new Goomba();
	this.goomba2 = new Goomba();
	this.goomba3 = new Goomba();

	this.coins = new Coins(this.hud);

}


SuperMario.Game.prototype.create = function() {

	//Creamos el sprite de fondo
	game.add.sprite(0, 0, 'fondo');

	//Inicializar la física
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//PLATAFORMAS

	//Creamos el grupo de objetos que conforman la plataforma
	this.plataformas = game.add.group();

	//Los elementos del grupo plataformas tienen física
	this.plataformas.enableBody = true;

	// Aquí creamos el suelo.
	var suelo = this.plataformas.create(0, game.world.height - 32, 'suelo');
	
	// Hacemos que no se pueda atravesar el suelo
	suelo.body.immovable = true;

	// Creamos un par de plataformas para saltar en ellas
	var plataforma = this.plataformas.create(150, game.world.height - 125, 'plataforma');
	plataforma.body.immovable = true;

	plataforma = this.plataformas.create(300, game.world.height - 225, 'plataforma');
	plataforma.body.immovable = true;

	//SONIDOS

	// Cargamos los sonidos del juego
	snd_main = game.add.audio('snd_game',1,true);
	snd_die = game.add.audio('snd_die');
	snd_main.play();

	//ENTIDADES

	// Creamos a mario
	this.mario.create();
	// Creamos las monedas
	this.coins.create();
	// Creamos el hud
	this.hud.create();
	// Creamos a goomba
	this.goomba.create();
	this.goomba2.create();
	this.goomba3.create();

}


SuperMario.Game.prototype.update = function() {

	this.coins.update(this.plataformas, this.mario);
	this.hud.update();
	this.goomba.update(this.plataformas, this.mario);
	this.goomba2.update(this.plataformas, this.mario);
	this.goomba3.update(this.plataformas, this.mario);
	this.mario.update(this.plataformas);

}