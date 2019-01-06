var game = document.getElementById("SliderPuzzleDiv");
var width;
var height;

var tileheight =100;
var tilewidth =100;
var tilepadding = 5;


function initialize(w,h){
	width = w;
	height = h;
	id = 0;
	for(var h = 0; h < height;h++){
		for(var w = 0; w < width;w++){
			var puzzle = document.createElement("div");   
			puzzle.setAttribute("class", "puzzle");
			puzzle.setAttribute("id", id);
			puzzle.setAttribute("onclick","move(this, isFinished)");
			puzzle.style["margin-left"] = (tileheight + tilepadding) * w + "px";
			puzzle.style["margin-top"] = (tileheight + tilepadding) * h + "px";
			puzzle.innerHTML = id;
			
			if (((w+1)*(h+1)) == (height*width)){
				puzzle.setAttribute("class", "gap");
				puzzle.innerHTML = "";
			}
			game.appendChild(puzzle);
			id++;
		}
	}
	randomTiles(4000);
}

function move(tile, callback){
	if (tile){ //Tile is not null or undefined
		if (tile.className != "gap"){ //The tile is not the gap tile

			tileId = Number(tile.id); //Number converts from string to int
			gapTile = game.getElementsByClassName("gap")[0];
			
			//right
			if (tileId + 1 < (width*height)){
				if (game.children[tileId + 1].id == gapTile.id){
					swaptile(tile,gapTile);
					callback();
					return true;
				}	
			}
			
			//left
			if ((tileId - 1) >= 0 ){
				if (game.children[tileId - 1].id == gapTile.id){
					swaptile(tile,gapTile);
					callback();
					return true;
				}
			}
			//up
			if ((tileId - width) >= 0 ){
				if (game.children[tileId - width].id == gapTile.id){
					swaptile(tile,gapTile);
					callback();
					return true;
				}
			}
			//down
			if ((tileId + width) < (width*height)){
				if (game.children[tileId + width].id  == gapTile.id){
					swaptile(tile,gapTile);
					callback();
					return true;
				}
			}
			
		}
	}
	return false;
}

function swaptile(tileFrom,tileTo){
	tileFrom.setAttribute("class", "gap");
	tileTo.innerHTML = tileFrom.innerHTML;
	tileTo.setAttribute("class", "puzzle");
	tileFrom.innerHTML = "";
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomTiles(times){
	possiblemoves = [1,-1, width, width * -1];
	for(i = 0; i < times;i++ ){
		while(true){
			gapTileId = Number(game.getElementsByClassName("gap")[0].id);
			moveTileId = gapTileId + possiblemoves[getRandomInt(0,3)];
			tile = game.children[moveTileId];
			if (move(tile, getRandomInt)){
				break;
			}	
		}		
		i++
	}
}

function isFinished(){
	var previous;
	var count = 0;
	for(i =0; i < game.children.length;i++){
		var current = Number(game.children[i].innerHTML);
		if (current == 0 || current == previous + 1){
			count++
		}
		previous = current;
	}
	if (count == game.children.length){
		alert("Puzzle Solved");
	}
}


initialize(3,3);
