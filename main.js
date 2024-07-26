var btn = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");
var btn5 = document.createElement("button");
var btn6 = document.createElement("button");
var btn7 = document.createElement("button");

function remove(el) {
	var element = el;
	element.remove();
} // remove elements

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var endTheGame = false;

function main() {

	var clicks = 0;

	var CpS = 0;

	var clickMult = 1;

	var delay = 50; // updating delay (ms)
	var delay1Sec = 1000; // delay for 1 sec (1000 milli)

	var cursors = 0;
	var hands = 0;
	var mice = 0;

	var cost = 0; // pay function cost

	var scale = 1.15; // EACH CLICKER COSTS 115% AS MUCH AS PREV ONE
	var cursorcost = 50;
	var handcost = 200;
	var micecost = 500;

	var shopUnlocked = false;
	var clickersUnlocked = [false, false, false];

	function pay(cost) { // pay function
		clicks -= cost;
	}
	document.body,appendChild(btn7);
	btn7.innerHTML = "Click to quit the game (progress will not be saved).";
	btn7.onclick = function leave() {
		wait(1, "t1", "");
		wait(1, "t2", "");
		remove(btn);
		remove(btn2);
		remove(btn3);
		remove(btn4);
		remove(btn5);
		remove(btn6);
		document.body.appendChild(btn);
		btn.onclick = function enter() {
			clickGame();
		}
		btn.innerHTML = "Try it.";
		document.body.appendChild(btn2);
		btn2.onclick = function look() {
			// cont here
		}
		btn2.innerHTML = "Leave the room.";
		remove(btn7);
	}

	// original click button
	btn.onclick = function click() {
		clicks += clickMult;
	}
	document.body.appendChild(btn);

	// constant update various things to be checked
	function loopUpdating() {
		setTimeout(function() {
			CpS = (cursors + (hands * 2) + (mice * 4)); // update actual cps 

			cursorcost = Math.round(cursorcost);
			handcost = Math.round(handcost);
			micecost = Math.round(micecost);

			if (!endTheGame) {
				btn.innerHTML = "+ " + clickMult + " click(s)";
				document.getElementById("t1").innerHTML = "You have " + clicks + " clicks!";
			}

			if (clicks >= 30 && shopUnlocked == false) { // shop function - open shop once 50 clicks
				document.body.appendChild(btn2);
				shopUnlocked = true;
				shop();
			}
			if ((cursors >= 1 || hands >= 1 || mice >= 1) && !endTheGame)  {
				document.getElementById("t2").innerHTML = "You have " + cursors + " cursors, " + hands + " hands," + " and " + mice + " mice," + " giving " + CpS + " clicks per second.";
			}
			btn4.innerHTML = "buy cursor (gives " + 1 + " clicks per second) for " + Math.round(cursorcost) + " clicks";
			btn5.innerHTML = "buy hands (gives " + 2 + " clicks per second) for " + Math.round(handcost) + " clicks";
			btn6.innerHTML = "buy mice (gives " + 4 + " clicks per second) for " + Math.round(micecost) + " clicks";

			loopUpdating();
		}, delay);
	}
	loopUpdating();

	// updating clicks based on cps (separate loop because needs 1 second delay)
	function updatingClicks() {
		setTimeout(function() {
			if (!endTheGame) {
				clicks += CpS;
			}
			updatingClicks();
		}, delay1Sec);
	}
	updatingClicks();

	function loadEnding() {
		setTimeout(function endGame() {
			if (clicks >= 1000) {
				endTheGame = true;
				remove(btn);
				remove(btn2);
				remove(btn3);
				remove(btn4);
				remove(btn5);
				remove(btn6);
				document.getElementById("t1").innerHTML = "Thanks for playing."
				document.getElementById("t2").innerHTML = "Made by Pac.";
			}
			loadEnding();
		}, delay);
	}
	loadEnding();

	// the shop
	function shop() {
		function gtShop(){
			btn2.innerHTML = "Go to shop";
			btn2.onclick = function goToShop() {
				shopUpgClicks();
				shopUpgClickers();
				remove(btn2);
			}
		}
		gtShop();
		function shopUpgClicks() { // buy click upgrades
			var upg1 = 0;
			var upg2 = 0;
			document.body.appendChild(btn3);
			btn3.innerHTML = "double clicks on click for 50 clicks";
			btn3.onclick = function upgClickMult() {
				if (clicks >= 50 && upg1 == 0) {
					pay(50);
					clickMult = 2;
					btn3.innerHTML = "double clicks on click (for a total of 4x clicks) for 250 clicks";
					upg1 = 1;
				} else if (clicks >= 250 && upg1 == 1 && upg2 == 0) {
					pay(250);
					clickMult *= 2;
					btn3.innerHTML = "double clicks on click (for a total of 8x clicks) for 500 clicks";
					upg2 = 1;
				} else if (clicks >= 500 && upg1 == 1 && upg2 == 1) {
					pay(500);
					clickMult *= 2;
					remove(btn3);
				}
			}
		}
		function shopUpgClickers() { // buy clickers
			function updatingClickers() {
				setTimeout(function() {
					if (!clickersUnlocked[0] && clicks > cursorcost) {
						clickersUnlocked[0] = true;
						document.body.appendChild(btn4);
						btn4.innerHTML = "buy cursors (gives " + 1 + " clicks per second) for " + cursorcost + " clicks";
						btn4.onclick = function buyCursor() { // tier 1 of clickers
							if (clicks >= cursorcost) {
								pay(cursorcost);
								cursorcost *= scale;
								cursors += 1;
							}
						}
					}
					if (!clickersUnlocked[1] && clicks > handcost) {
						clickersUnlocked[1] = true;
						document.body.appendChild(btn5);
						btn5.innerHTML = "buy hands (gives " + 2 + " clicks per second) for " + handcost + " clicks";
						btn5.onclick = function buyHand() { // tier 2
							if (clicks >= handcost) {
								pay(handcost);
								handcost *= scale;
								hands++;
							}
						}
					}
					if (!clickersUnlocked[2] && clicks > micecost) {
						clickersUnlocked[2] = true;
						document.body.appendChild(btn6);
						btn6.innerHTML = "buy mice (gives " + 4 + " clicks per second) for " + micecost + " clicks";
						btn6.onclick = function buyMice() { // tier 3
							if (clicks >= micecost) {
								pay(micecost);
								micecost *= scale;
								mice++;
							}
						}
					}
					updatingClickers();
				}, delay);
			}
			updatingClickers();
		}
	}
}	
