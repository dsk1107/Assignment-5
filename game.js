var TOTAL = 0;
var TIMER = null;
var COUNT = 25;
var TARGET = null;

window.onload = function() {
	document.getElementById("start").onclick = gameStart;
	document.getElementById("clear").onclick = gameClear;
}

function gameStart() {
	gameClear();
	var difficulty;
	var difficulties = document.getElementsByName("difficulty");
	for(var i = 0; i < difficulties.length; i++) {
		if(difficulties[i].checked) {
			difficulty = parseInt(difficulties[i].value);
		}
	}
	TARGET = Math.floor(Math.random() * (100/difficulty)) + 91;  
	alert("Collect exactly $" + TARGET + " in 25 seconds");
	count();
	
	for(var i = 0; i < 40 * difficulty; i++) {
		var coin = document.createElement("div");
		coin.classList.add("coin");
		coin.style.position = "absolute";
		coin.innerHTML = "$" + (Math.floor(Math.random() * 6) + difficulty);
		if(difficulty == 2) {
			coin.style.backgroundColor = "red";
		}
		coin.onclick = get;
		document.getElementById("field").appendChild(coin);
	}
	place();
}

function place() {
	var coins = document.querySelectorAll('.coin');
	for (var i = 0; i < coins.length; i++) {
		coins[i].style.left = Math.floor(Math.random() * 570) + 'px';
		coins[i].style.top  = Math.floor(Math.random() * 370) + 'px';
	}
}

function gameClear() {
	document.getElementById("field").innerHTML = "";
	COUNT = 25;
	TOTAL = 0;
	document.getElementById("time").innerHTML = "Time: " + COUNT;
	document.getElementById("time").style.color = "yellow";
	clearTimeout(TIMER);
}

function get() {
	TOTAL += parseInt(this.innerHTML.substring(1,2));
	this.parentNode.removeChild(this);
}

function count() {
	document.getElementById("time").innerHTML = "Time: " + COUNT;
	COUNT--;
	if(COUNT < 5) {
		document.getElementById("time").style.color = "red";
	}
	TIMER = setTimeout('count()', 1000);
	if(COUNT == -1) {
		gameOver();
	}
}

function gameOver() {
	if(TOTAL == TARGET) {
		alert("Great work! You got $ " + TOTAL + "! (Target: $" + TARGET + ")" );
	} else {
		alert("You lost... You got $ " + TOTAL + ". (Target: $" + TARGET + ")" );
	}
	gameClear();
}