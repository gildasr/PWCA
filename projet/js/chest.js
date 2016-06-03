//////////////
//Chest class
//////////////

function Chest(x, y, empty) {
	this.img = new Image();
	this.img.src = "./data/sprites/chest.png";
	//this.img.addEventListener("load", loaded, false);
	this.width = 16,
	this.height = 16,
	this.x = x;
	this.y = y;
	this.empty = empty;
	this.open = false;
	this.exists = true;
}


Chest.prototype.clear = function() {
	ctxArena.clearRect(this.x, this.y, this.width, this.height);
}


//methode appelee uniquement quand le hero ouvre un coffre.
Chest.prototype.update = function() {
		this.open = true;
		this.empty = true;
}


Chest.prototype.draw = function() {
	ctxArena.drawImage(this.img, this.open*this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}


