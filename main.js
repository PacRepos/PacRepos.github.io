var clicks = 0;
var manualClickMult = 1;
var wasCreated = false;

var cBought = [false, false];
var clickers = [0, 0];

var cps = 0;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function eraseCookie(cname) {
    setCookie(cname, "", -1);
}

function addShopButtons() {
    var div = document.getElementById("shop");
    if (clicks >= 50 && wasCreated == false) {
        var btn = document.createElement("button");
        div.append(btn);
        btn.setAttribute("id", "mupg1");
        document.getElementById("mupg1").innerHTML = "Gain a x2 Multiplier to clicking manually for 50 clicks!";
        wasCreated = true;
        document.getElementById("mupg1").onclick = function() {
            if (clicks >= 50) {
                clicks = clicks - 50;
                manualClickMult *= 2;
                this.remove();
            }
        }
    }

    if (clicks >= 50) {
        var c1btn = document.createElement("button");
        div.append(c1btn);
        btn.setAttribute("id", "cupg1");
        document.getElementById("cupg1").innerHTML = "Purchase an automatic tier 1 clicker that gives 1 click per second";
        document.getElementById("cupg1").onclick = function() {
            if (clicks >= 50) {
                clicks = clicks - 50;
                clickers[0]++;
            }
        }
    }
}

function main() {
    clicks = getCookie("clickamt");
    manualClickMult = getCookie("manualClickMult");
    wasCreated = getCookie("created");
    cBought = getCookie("bought");
    if (manualClickMult == null || manualClickMult == "") {
        manualClickMult = 1;
    }
    if (clicks == "" || clicks == null) {
        clicks = 0;
    } else {
        clicks = Number(clicks);
    }

    setInterval(function() {
        document.getElementById("clickcount").innerHTML = "You have " + clicks + " clicks!";
        document.getElementById("clicker").innerHTML = "Get +" + manualClickMult + " Clicks!";

        for (var i = 1; i <= clickers.length; i++) {
            cps += i * clickers[i];
        }
        
        if (cBought[0]) {
            document.getElementById("active").innerHTML = "You have " + clickers[0] + " tier 1 clickers giving " + clickers[0] + " clicks per second.");
        } else if (cBought[1]) {
             document.getElementById("active").innerHTML = "You have " + clickers[0] + " tier 1 clickers giving " + clickers[0] + " clicks per second.
                 <br>
                 You have " + clickers[1] + " tier 2 clickers giving " + (2 * clickers[1] + " clicks per second.
                 <br>
                 Your total clicks per second is " + cps + ".");
        } else {
            document.getElementById("active").innerHTML = "";
        }
        
        setCookie("clickamt", clicks, 365);
        setCookie("manualClickMult", manualClickMult, 365);
        setCookie("created", wasCreated, 365);
        setCookie("bought", cBought, 365);
        
        addShopButtons();
        
        if (clicks >= 1000000000) {
            document.getElementById("clickcount").innerHTML = "You're funny lil bro";
            document.getElementById("clicker").innerHTML = "This is a work in progress so don't exploit it";
            document.getElementById("clicker").onclick = function niceTry() {
                clicks = 0;
                manualClickMult = 1;
            }
        }    
    }, 10);

    document.getElementById("clicker").onclick = function click() {
        clicks = Number(clicks) + Number(manualClickMult);
    }

    document.getElementById("rs").onclick = function reset() {
        clicks = 0;
        manualClickMult = 1;
        wasCreated = false;
        cBought = [false, false];
    }
}
