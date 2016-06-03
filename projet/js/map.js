////////////////////////
//Map & Tileset classes
////////////////////////

//Map class.
function Map(tileset, land, i, j) {
	this.tileset = new Tileset(tileset);
	this.land = land;
}

Map.prototype.draw = function() {
	for(var y = 0; y < (arenaHeight/caseSize); y++) {
		for(var x = 0; x < (arenaWidth/caseSize); x++) {
			this.tileset.draw(this.land[y][x], x, y);
		}
	}
}


//Tileset class.
function Tileset(src) {
	this.img = new Image();
	this.img.src ="./data/tilesets/" + src;
	this.size = caseSize;
}

Tileset.prototype.draw = function(num, x, y) {
	ctxArena.drawImage(this.img, num*this.size, 0, this.size, this.size, x*this.size, y*this.size, this.size, this.size);
}


