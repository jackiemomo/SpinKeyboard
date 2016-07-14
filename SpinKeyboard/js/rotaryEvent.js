/*global tau */
(function() {
	var page = document.getElementById("pageRotaryEvent"), rotaryDetentHandler, currentDirection = "", command = "", counter = 0, value = 0, funcTimeout;
	/**
	 * pagebeforeshow event handler Do preparatory works and adds event
	 * listeners
	 */
	page.addEventListener("pagebeforeshow", function() {
		var direction, steps;

		// "rotarydetent" event handler
		rotaryDetentHandler = function(e) {
			// Get rotary direction
			if (funcTimeout != undefined)
				clearTimeout(funcTimeout);
			direction = e.detail.direction;

			if (direction === "CW") {
				// Right direction

				if (currentDirection == "")
					currentDirection = "CW";
				if (currentDirection != "CW") {
					command = command + "-" + counter
					counter = 0;
					currentDirection = "CW";
				}
				counter++;
				value++;
			} else if (direction === "CCW") {

				if (currentDirection == "")
					currentDirection = "CCW";
				if (currentDirection != "CCW") {
					command = command + "+" + counter;
					counter = 0;
					currentDirection = "CCW";
				}
				counter++;
				value--;
			}
			if (value == 26)
				value = 0;
			if (value == -1) {
				value = 26;
			}
			$("#cursor").rotate(value * 360 / 26);
			funcTimeout = setTimeout(finishTyping, 1000);
		};

		// Add rotarydetent handler to document
		document.addEventListener("rotarydetent", rotaryDetentHandler);
	});

	/**
	 * pagehide event handler Destroys and removes event listeners
	 */
	page.addEventListener("pagehide", function() {
		document.removeEventListener("rotarydetent", rotaryDetentHandler);
	});
//	var enterText = document.getElementById("enter_text");
//	enterText.addEventListener("click", function() {
//		if (currentDirection == "CW") {
//			command = command + "+" + counter;
//		} else {
//			command = command + "-" + counter;
//		}
//		counter = 0;
//		value = 0;
//		alert(command);
//
//		showDataRecord(command);
//
//		command = "";
//		currentDirection = "";
//	});
//
//	function valueToLetter(value) {
//		String.fromCharCode(94 + value);
//	}
	function finishTyping() {
		if (currentDirection == "CW") {
			command = command + "+" + counter;
		} else {
			command = command + "-" + counter;
		}
		counter = 0;
		value = 0;

		showDataRecord(command);

		command = "";
		currentDirection = "";
	}

}());
