Goomba = function(mario) {

	game.load.spritesheet('goomba', 'assets/images/enemies/goomba.gif', 32, 32);

}

Goomba.prototype.create = function() {
	
	this.goomba = game.add.sprite(game.world.width/2+Math.random()*400, 32, 'goomba');
	
	// Goomba tiene física
	game.physics.arcade.enable(this.goomba);
	
	// Física y animaciones de Goomba
	this.goomba.body.bounce.y = 0;
	this.goomba.body.bounce.x = 1; //Rebote a los lados
	this.goomba.body.gravity.y = 1000;
	this.goomba.body.velocity.x = -50;
	this.goomba.body.collideWorldBounds = true;
	


	// Animación
	this.goomba.animations.add('walk', [0, 1], 3, true);
	this.goomba.animations.play('walk');

}

Goomba.prototype.update = function(plataformas, mario) {

	//Detectar colisión con plataformas
	game.physics.arcade.collide(this.goomba, plataformas);
	
	//Detectar colisión con mario y llamar a la función killmario
	this.mario = mario;
	if(mario.alive())
		game.physics.arcade.overlap(mario.sprite(), this.goomba, killmario, null, this);

}

//
//FUNCION DE COLISION DEL PERSONAJE CON GOOMBA
//
function killmario(mariosprite, goomba) {

	if(goomba.body.touching.up)
	{
		mariosprite.body.velocity.y = -300;
		goomba.kill();
	}
	else
	{
		this.mario.kill();
	}
	
}