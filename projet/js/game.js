/////////////////////////
//animationFrame for all
/////////////////////////
var animationFrame = window.requestAnimationFrame ||
							 window.mozRequestAnimationFrame ||
           				 window.webkitRequestAnimationFrame ||
							 window.msRequestAnimationFrame;		


///////////////
//variables
///////////////

var divArena;
var canArena;
var ctxArena;
var arenaWidth = 640;
var arenaHeight = 640;
var caseSize = 16;

var time = 0;

////////////////////////
//keys
////////////////////////

var keyStatus = {};


function doKeyDown(event) {
	if (event.defaultPrevented) {
		return;
	}
	var keycode = event.key
	switch(keycode) {
		case "ArrowRight":
			keyStatus[keycode] = true;
		break;
		case "ArrowUp":
			keyStatus[keycode] = true;
		break;
		case "ArrowLeft":
			keyStatus[keycode] = true;
		break;
		case "ArrowDown":
			keyStatus[keycode] = true;
		break;
		case " ":	//spacebar.
			keyStatus[keycode] = true;
		break;
		case "Enter":
			keyStatus[keycode] = true;
		break;
		default:
			return;
	}
	event.preventDefault();
}


function doKeyUp(event) {
	if (event.defaultPrevented) {
		return;
	}
	var keycode = event.key
	switch(keycode) {
		case "ArrowRight":
			keyStatus[keycode] = false;
		break;
		case "ArrowUp":
			keyStatus[keycode] = false;
		break;
		case "ArrowLeft":
			keyStatus[keycode] = false;
		break;
		case "ArrowDown":
			keyStatus[keycode] = false;
		break;
		case " ":
			keyStatus[keycode] = false;
		break;
		case "Enter":
			keyStatus[keycode] = false;
		break;
		default:
			return;
	}
}


///////////////////////
//maps
//////////////////////

var map;

//40x40
var landForest = [
[17,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,17,18],
[19,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,20],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[17,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,18],
[19,20,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,19,20],
];


////////////////////////
//hero
///////////////////////

var hero;


//////////////////////////////
//chests
//////////////////////////////

var chestSet;


//////////////////////////////
//monster
//////////////////////////////

var monsterSet;


//////////////////////////////
//Set class
//////////////////////////////

Set = function() {
	this.tab = new Array();
}


Set.prototype.add = function(object) {
	this.tab.push(object);
}


Set.prototype.remove = function(index) {
	this.tab.map(function(object, index, array) {
		if(object.exists === false) {
			delete array[index];
		}
	});
}	


Set.prototype.clear = function() {
	this.tab.map(function(object) {
		object.clear();
	});
}


Set.prototype.update = function() {
	this.tab.map(function(object) {
		object.update();
	});
	this.remove();
}


Set.prototype.draw = function() {
	this.tab.map(function(object) {
		object.draw();
	});
}


/////////////////////////////////
//game loop
/////////////////////////////////

//boucle de jeu.
function loop() {
	clearGame();
	updateGame();
	drawGame();
}


function clearGame() {
	chestSet.clear();
	hero.clear();
	monsterSet.clear();
}


function updateGame() {
	hero.update();
	time++;
	if(time % 300 == 1) {
		monsterSet.add(new Monster(320 ,320));
	}
	monsterSet.update();
}


function drawGame() {
	map.draw();
	chestSet.draw();
	hero.draw();
	monsterSet.draw();
}


function recursiveAnim() {
	loop();
	animationFrame(recursiveAnim);
}


///////////////////////
//initializations
///////////////////////

/*var nbImg = 2;
var nbImgLoaded = 0;*/


function init() {
	divArena = document.getElementById("arena");
	//canvas.
	canArena = document.createElement("canvas");
	canArena.setAttribute("id", "canArena");
	ctxArena = canArena.getContext("2d");
	canArena.setAttribute("height", arenaHeight);
	canArena.setAttribute("width", arenaWidth);
	divArena.appendChild(canArena);
	//objects.
	map = new Map("forest.png", landForest, 0, 0);
	
	chestSet = new Set();
	chestSet.add(new Chest(320, 32, false));
	chestSet.add(new Chest(560, 320, true));
	chestSet.add(new Chest(480, 560, true));
	chestSet.add(new Chest(160, 560, false));
	chestSet.add(new Chest(32, 320, true));
	
	hero = new Hero(16, 32);

	monsterSet = new Set();
	//keyboard event.
	window.addEventListener("keydown", doKeyDown, false);
	window.addEventListener("keyup", doKeyUp, false);
	//loop game.
	recursiveAnim();
}

/*
//vérifier que toutes images bien chargées avant de lancer l'init.
function loaded() {
	nbImgLoaded++;
	if(nbImgLoaded === nbImg) {
		init();
	}
}*/ //ne fonctionne pas car image ne charge que lorsqu'une instance de la classe est creee (ie pendant l'init).


window.addEventListener("load", init, false);

