////////////////
//Monster class
////////////////

function Monster(x, y) {
	this.img = new Image();
	this.img.src = "./data/sprites/tentacle.png";
	//this.img.addEventListener("load", loaded, false);
	this.width = 16;
	this.height = 16;
	this.x = x;
	this.y = y;
	this.dir = 1;
	this.speed = 1;
	this.cptWalk = 0;
	this.exists = true;
}


//vérifie si la case de la map n'est pas un obstacle.
Monster.prototype.walkPossible = function() {
	var ok = false;
	switch(this.dir) {
		case 0:	//deplacement vers la droite.
			if(map.land[((this.x + caseSize)/caseSize)][this.y/caseSize] < 1) {
				ok = true;
			}
			break;
		case 1:	//deplacement vers le haut.
			if(map.land[this.x/caseSize][(this.y - caseSize)/caseSize] < 1) {
				ok = true;
			}
			break;
		case 2:	//deplacement vers le bas.
			if(map.land[(this.x - caseSize)/caseSize][this.y/caseSize] < 1) {
				ok = true;
			}
			break;
		case 3:	//deplacement vers la gauche.
			if(map.land[this.x/caseSize][(this.y + caseSize)/caseSize] < 1) {
				ok = true;
			}
			break;
		default:
			return;
	}
	return ok;
}


//vérifie les collision entre objets (coffres & hero).
Monster.prototype.collision = function(tabOfObjects) {
	var hits = false;
	var index;
	for(index in tabOfObjects) {
		switch(this.dir) {
			case 0 :	//deplacement vers la droite.
				//si la case de droite est "occupee".
				if ((this.x === tabOfObjects[index].x - caseSize) && (this.y === tabOfObjects[index].y)) {
					hits = true;
				}
				break;
			case 1 :	//deplacement vers le haut.
				//si la case du haut est "occupee".
				if ((this.x === tabOfObjects[index].x) && this.y === (tabOfObjects[index].y + caseSize)) {
					hits = true;
				}
				break;
			case 2 :	//deplacement vers la gauche.
				//si la case de gauche est "occupee".
				if ((this.x === tabOfObjects[index].x + caseSize) && (this.y === tabOfObjects[index].y)) {
					hits = true;
				}
				break;
			case 3 :	//deplacement vers le bas.
				//si la case du bas est "occupee".
				if ((this.x === tabOfObjects[index].x) && (this.y === tabOfObjects[index].y - caseSize)) {
					hits = true;
				}
				break;
			default:
				return;
		}
	}
	return hits;
}


//le monstre est tue.
Monster.prototype.kill = function() {
	this.exists = false;
}


Monster.prototype.clear = function() {
	ctxArena.clearRect(this.x, this.y, this.width, this.height);
}


Monster.prototype.update = function() {
	if(this.cptWalk != 16) {
		this.cptWalk++;
		switch(this.dir) {
			case 0 :	//deplacement vers la droite.
				this.x += this.speed;
				break;
			case 1 :	//deplacement vers le haut.
				this.y -= this.speed;
				break;
			case 2 :	//deplacement vers la gauche.
				this.x -= this.speed;
				break;
			case 3 :	//deplacement vers le bas.
				this.y += this.speed;
				break;
			default:
				return;
		}
	} else {
		//choix d'une direction aleatoirement apres un deplacement d'une case (entre 0 et 3).
		this.dir = Math.floor(Math.random()*4);
		//si deplacement impossible, pas de deplacement.
		if(this.walkPossible && !(this.collision(chestSet.tab))) {
			this.cptWalk = 0;
		}
	}
}


Monster.prototype.draw = function() {
	ctxArena.drawImage(this.img, this.cptWalk*this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}


