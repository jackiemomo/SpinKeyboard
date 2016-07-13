/*global tau */
(function() {
	var page = document.getElementById("pageRotaryEvent"), rotaryDetentHandler, currentDirection = "", command = "", counter = 0, value = 0;
	
	var current_dt, last_dt;
	/**
	 * pagebeforeshow event handler Do preparatory works and adds event
	 * listeners
	 */
	page.addEventListener("pagebeforeshow", function() {
		var resultDiv = document.getElementById("result"), direction, steps;
		
		// "rotarydetent" event handler
		rotaryDetentHandler = function(e) {
			// Get rotary direction
			direction = e.detail.direction;

			if (direction === "CW") {
				// Right direction
				value++;
				if (currentDirection == ""){
					currentDirection = "CW";
					//last_dt = tizen.time.getCurrentDateTime();
				}
					
				if (currentDirection != "CW") {
					command = command + String.fromCharCode(96 + value);
					currentDirection = "CW";
				}
				
			} else if (direction === "CCW") {
				
				if (currentDirection == ""){
					currentDirection = "CCW";
				}
				if (currentDirection != "CCW") {
					command = command + String.fromCharCode(96 + value +  1);;
					currentDirection = "CCW";
				}
				value--;
			}
			resultDiv.innerText = command;
			if (value == 26)
				value = 0;
			if(value == -1){
				value = 26;
			}
		      $("#cursor").rotate(value*360/26);
		};

		// Add rotarydetent handler to document
		document.addEventListener("rotarydetent", rotaryDetentHandler);
	});

	/**
	 * pagehide event handler Destroys and removes event listeners
	 */
	page.addEventListener("pagehide", function() {
		
	});
	var enterText = document.getElementById("enter_text");
	enterText.addEventListener("click", function() {
		if(currentDirection == "CW"){
			command = command + "+" + counter;
		}
		else{
			command = command + "-" + counter;
		}
		counter = 0;
		value=0;
		alert(command);
		
		showDataRecord(command);
		
		
		command = "";
		currentDirection = "";
	});
	
	function valueToLetter(value){
		    String.fromCharCode(94 + value);
	}
	
}());

