/////////////
//Hero class
/////////////

function Hero(x, y) {
	this.img = new Image();
	this.img.src = "./data/sprites/hero.png";
	//this.img.addEventListener("load", loaded, false);
	this.life = 3;
	this.width = 20;
	this.height = 26;
	this.x = x;
	this.y = y;
	this.dir = 1;
	this.speed = 2;
	this.walk = false;
	this.attack = false;
	this.open = false;
	this.cptWalk = 0;
	this.cptAttack = 0;
	this.cptOpen = 0;
}


//vérifie si la case de la map n'est pas un obstacle.
Hero.prototype.walkPossible = function() {
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
		case 2:	//deplacement vers la gauche.
			if(map.land[(this.x - caseSize)/caseSize][this.y/caseSize] < 1) {
				ok = true;
			}
			break;
		case 3:	//deplacement vers le bas.
			if(map.land[this.x/caseSize][(this.y + caseSize)/caseSize] < 1) {
				ok = true;
			}
			break;
		default:
			return;
	}
	return ok;
}


//vérifie les collision entre objets (coffres & monstres).
Hero.prototype.collision = function(tabOfObjects) {
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


//pas egalite sur les positions mais plutot des intervalles.
Hero.prototype.kill = function(tabOfObjects) {
	var index;
	for(index in tabOfObjects) {
		switch(this.dir) {
			case 0 :	//attaque vers la droite.
				//si un monstre est present a droite.
				if ((this.x === tabOfObjects[index].x - caseSize) && (this.y === tabOfObjects[index].y)) {
					tabOfObjects[index].kill();
				}
				break;
			case 1 :	//attaque vers le haut.
				//si un monstre est present en haut.
				if ((this.x === tabOfObjects[index].x) && this.y === (tabOfObjects[index].y + caseSize)) {
					tabOfObjects[index].kill();
				}
				break;
			case 2 :	//attaque vers la gauche.
				//si un monstre est present a gauche.
				if ((this.x === tabOfObjects[index].x + caseSize) && (this.y === tabOfObjects[index].y)) {
					tabOfObjects[index].kill();
				}
				break;
			case 3 :	//attaque vers le bas.
				//si un monstre est present en bas.
				if ((this.x === tabOfObjects[index].x) && (this.y === tabOfObjects[index].y - caseSize)) {
					tabOfObjects[index].kill();
				}
				break;
			default:
				return;
		}
	}
}


Hero.prototype.opening = function(tabOfObjects) {
	var index;
	for(index in tabOfObjects) {
		//test si devant un coffre ou non.
		if((this.dir === 1) && (tabOfObjects[index].open === false) && (this.x === tabOfObjects[index].x) && (this.y === tabOfObjects[index].y + caseSize)) {
			if(tabOfObjects[index].empty === false) {
				//this.open = true;
				this.life += 1;
			}
			//update des etats du coffre.
			tabOfObjects[index].update();			
		}
	}
}


//faire plusieurs cas ? (quand le perso attaque, les pos et tailles sont differentes)
//ne pose pas de pb car la map est redessinee a chaque boucle de jeu (car elle ne devait pas etre entierement affichee, ca n'a plus d'utilite).
Hero.prototype.clear = function() {
	ctxArena.clearRect(this.x-2, this.y-10, this.width, this.height);
}


Hero.prototype.update = function() {
	var keycode;
	if(this.walk === true) {	//si le hero se deplace.
		//if et non for pour ne pas bloquer la boucle de jeu (et donc bloquer les autres objets).
		if(this.cptWalk != 8) {
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
			this.walk = false;
			this.cptWalk = 0;
		}
	} else if(this.attack === true) {	//si le hero attaque.
		//if et non for pour ne pas bloquer la boucle de jeu (et donc bloquer les autres objets).
		if(this.cptAttack != 12) {
			this.cptAttack++;
		} else {
			this.attack = false;
			this.cptAttack = 0;
		}
	} else if(this.open === true) {	//si le hero ouvre un coffre non vide.
		//if et non for pour ne pas bloquer la boucle de jeu (et donc bloquer les autres objets).
		if(this.cptOpen != 16) {
			this.cptOpen++;
		} else {
			this.open = false;
			this.cptOpen = 0;
		}
	} else {
		for(keycode in keyStatus) {
			if(keyStatus[keycode] === true) {
				switch(keycode) {
					case "ArrowRight":
						this.dir = 0;	//declenche deplacement vers la droite.
						if(this.walkPossible() && !(this.collision(chestSet.tab))) {
							this.walk = true;
						}
						break;
					case "ArrowUp":
						this.dir = 1;	//declenche deplacement vers le haut.
						if(this.walkPossible() && !(this.collision(chestSet.tab))) {
							this.walk = true;
						}
						break;
					case "ArrowLeft":
						this.dir = 2;	//declenche deplacement vers la gauche.
						if(this.walkPossible() && !(this.collision(chestSet.tab))) {
							this.walk = true;
						}
						break;
					case "ArrowDown":
						this.dir = 3;	//declenche deplacement vers le bas.
						if(this.walkPossible() && !(this.collision(chestSet.tab))) {
							this.walk = true;
						}
						break;
					case " ":	//declenche une attaque.
						this.attack = true;
						this.kill(monsterSet.tab);
					break;
					case "Enter":	//ouverture si devant coffre .
						this.opening(chestSet.tab);
						//alert(this.life);
						break;
					default:
						return;
				}
			}
			keyStatus[keycode] = false;
		}
	}
}


Hero.prototype.draw = function() {
	if(this.walk === true) {
		//deplacement du perso
		ctxArena.drawImage(this.img, this.cptWalk*this.width, this.dir*this.height, this.width, this.height, this.x-2, this.y-10, this.width, this.height);
	} else if(this.attack === true) {	//taille sprites plus grande
		//attaque du perso
		switch(this.dir) {
			case 0 :
				ctxArena.drawImage(this.img, this.cptAttack*32, (this.dir*36)+104, 32, 36, this.x-1, this.y-8, 32, 36);
				break;
			case 1 :
				ctxArena.drawImage(this.img, this.cptAttack*32, (this.dir*36)+104, 32, 36, this.x-8, this.y-20, 32, 36);
				break;
			case 2 :
				ctxArena.drawImage(this.img, this.cptAttack*32, (this.dir*36)+104, 32, 36, this.x-15, this.y-8, 32, 36);
				break;
			case 3 :
				ctxArena.drawImage(this.img, this.cptAttack*32, (this.dir*36)+104, 32, 36, this.x-8, this.y-8, 32, 36);
				break;
			default:
				return;
		}
	} else if(this.open == true) {
		ctxArena.drawImage(this.img, 368, 0, 16, 37, this.x, this.y-27, 16, 37);	
	} else {
		//quand le perso est a l'arret : pas vraiment utile car cptWalk = 0 apres un déplacement.
		ctxArena.drawImage(this.img, 0, this.dir*this.height, this.width, this.height, this.x-2, this.y-10, this.width, this.height);
	}
}



