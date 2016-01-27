Mario = function() {

	game.load.spritesheet('mario', 'assets/images/character/mario_small.gif', 32, 32);

}

Mario.prototype.create = function() {

	// El jugador
	this.player = game.add.sprite(50, game.world.height - 150, 'mario');
	
	// El jugador tiene física
	game.physics.arcade.enable(this.player);
	
	// Propiedades del jugador
	this.player.body.bounce.y = 0.1;
	this.player.body.gravity.y = 1000;
	this.player.body.collideWorldBounds = true;
	
	// Las dos animaciones de andar.
	this.player.animations.add('right', [1, 2, 3], 10, true);
	this.player.animations.add('left', [15, 16, 17], 10, true);
	
	//Añade la entrada de teclado
	this.cursors = game.input.keyboard.createCursorKeys();
	
	this.killed = false;
	this.direccion = 'right';

}

Mario.prototype.sprite = function() {

	return this.player;

}

Mario.prototype.kill = function(mario, goomba) {

	this.killed = true;
	this.player.body.collideWorldBounds = false;
	this.player.body.velocity.x = 0;
	this.player.body.velocity.y = -250;
	this.player.body.gravity.y = 300;

	snd_main.stop();
	snd_die.play();

	snd_die.onStop.add(this.backtomenu, this);
}

Mario.prototype.backtomenu = function() {

	game.state.start('menu');

}

Mario.prototype.alive = function() {

	return !this.killed;

}

Mario.prototype.update = function(plataformas) {

	if(!this.killed)
	{
		game.physics.arcade.collide(this.player, plataformas);
	}

	if(this.killed)
	{
		this.player.frame = 12;
		return;
	}

	// Gestión teclado
	if (this.cursors.up.isDown && this.player.body.touching.down)
	{ //con tiled el touching habrá que cambiarlo por el blocked.down/top
		this.player.body.velocity.y = -500;		
	}

	if (this.cursors.left.isDown)
	{
		this.direccion = 'left';
		// Mueve a la izquierda
		this.player.body.velocity.x = -150;
		this.player.animations.play('left');
	}
	else if (this.cursors.right.isDown)
	{
		this.direccion = 'right';
		// Mueve a la derecha
		this.player.body.velocity.x = 150;
		this.player.animations.play('right');
	}
	else
	{
		this.player.body.velocity.x = 0;
		//Para
		this.player.animations.stop();
		if(this.direccion == 'right')
			this.player.frame = 0;
		else
			this.player.frame = 14;		
	}

	//sobreescribe cualquier animación si está saltando
	if(!this.player.body.touching.down)
	{
		this.player.animations.stop();
		if(this.direccion == 'right')
			this.player.frame = 4;
		else
			this.player.frame = 18;
	}

}