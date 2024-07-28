/*
let div = document.querySelector('div');
for(var i = 0; i < 10; i++){
	let button = document.createElement('button');
      button.innerText = i;
  div.append(button);
}
*/
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') { // remove leading spaces
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

function main() {
  let clicks = getCookie("clickamt");
  if (clicks == "" || clicks == null) {
    clicks = 0;
  } else {
    clicks = Number(clicks);
  }
  document.getElementById("clickcount").innerHTML = "You have " + clicks + " clicks!";
  document.getElementById("clicker").onclick = function click() {
    clicks += 1;
    document.getElementById("clickcount").innerHTML = "You have clicked " + clicks + " times!";
    setCookie("clickamt", clicks, 365);
  }
}
