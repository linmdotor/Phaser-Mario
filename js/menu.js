var SuperMario = SuperMario || {};

SuperMario.Menu = function(game) {
	this.game = game;
}

SuperMario.Menu.prototype.preload = function() {

	game.load.image('menu', 'assets/images/other/splash_screen_600_416.jpg');

}

SuperMario.Menu.prototype.create = function() {

	var fondo = game.add.sprite(0, 0, 'menu');
	fondo.scale.setTo(this.game.width/fondo.width, this.game.height/fondo.height);
	fondo.fixedToCamera = true;
	this.game.input.onUp.add(this.startgame, this);

}

SuperMario.Menu.prototype.update = function() {

}

SuperMario.Menu.prototype.startgame = function() {

	game.state.start('game');

}