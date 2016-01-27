Goomba = function() {
	// Aparece arriba en el centro
	this.goomba = game.add.sprite(game.world.width/2, 32, 'goomba');
	
	// Goomba tiene física
	game.physics.arcade.enable(this.goomba);
	
	// Configurar las propiedades físicas de goomba: bounce, gravity, ...
	this.goomba.body.bounce.y = 0;
	this.goomba.body.bounce.x = 1; //Rebote a los lados
	this.goomba.body.gravity.y = 1000;
	this.goomba.body.velocity.x = -50;
	this.goomba.body.collideWorldBounds = true;
	


	// Animación
	this.goomba.animations.add('walk', [0, 1], 3, true);
	this.goomba.animations.play('walk');
}

Goomba.prototype.update = function() {
	//Detectar colisión con plataformas
	game.physics.arcade.collide(this.goomba, plataformas);
	
	//Detectar colisión con mario y llamar a la función killmario
	game.physics.arcade.overlap(player, this.goomba, killmario, null, this);
}

//
//FUNCION DE COLISION DEL PERSONAJE CON GOOMBA
//
function killmario(player, goomba) {

	if(goomba.body.touching.up)
	{
		//Si le damos con los pies
		// Mario rebota un poco hacia arriba
		// Muere goomba
		player.body.velocity.y = -300;
		goomba.kill();
	}
	else
	{
		//Si no
		// Mario rebota verticalmente hacia arriba
		// Deja de colisionar con el mundo para que desaparezca de la pantalla
		// Paramos el sonido principal
		// Reproducimos el sonido snd_die
		dead = true;
		player.body.collideWorldBounds = false;
		player.body.velocity.x = 0;
		player.body.velocity.y = -250;
		player.body.gravity.y = 300;
		player.animations.stop();
		player.frame = 12;
		snd_main.stop();
		snd_die.play();
	}

	
	
}