 var manualClickMult = 1;
         var wasCreated = false;
        
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
        
        function addShopButtons(clicks) {
        	var div = document.getElementById("shop");
        	if (clicks >= 50 && wasCreated == false) {
        		var btn = document.createElement("button");
        		div.append(btn);
        		btn.setAttribute("id", "upg1");
        		document.getElementById("upg1").innerHTML = "Gain a x2 Multiplier to clicking manually for 50 clicks!";
        		wasCreated = true;
        		document.getElementById("upg1").onclick = function() {
        			if (clicks >= 50) {
        				clicks = clicks - 50;
        				manualClickMult *= 2;
        				this.remove();
        			}
        		}
        	}
        }
        
        function main() {
          var clicks = getCookie("clickamt");
          manualClickMult = getCookie("manualClickMult");
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
        	  setCookie("clickamt", clicks, 365);
        	  setCookie("manualClickMult", manualClickMult, 365);
        	  addShopButtons(clicks);
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
        }
