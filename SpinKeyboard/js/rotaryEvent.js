/*global tau */
(function() {
	var page = document.getElementById("pageRotaryEvent"), rotaryDetentHandler, currentDirection = "", command = [], counter = 0, value = 1, funcTimeout1, funcTimeout2;
	/**
	 * pagebeforeshow event handler Do preparatory works and adds event
	 * listeners
	 */
	page.addEventListener("pagebeforeshow", function() {
		var direction, steps;

		// "rotarydetent" event handler
		rotaryDetentHandler = function(e) {
			// Get rotary direction
			if (funcTimeout1 != undefined)
				clearTimeout(funcTimeout1);
			if (funcTimeout2 != undefined)
				clearTimeout(funcTimeout2);
			direction = e.detail.direction;

			if (direction === "CW") {
				// Right direction

				if (currentDirection == "")
					currentDirection = "CW";
				if (currentDirection != "CW") {
					currentDirection = "CW";
					command.push(value);
				}
				value++;
			} else if (direction === "CCW") {

				if (currentDirection == "")
					currentDirection = "CCW";
				if (currentDirection != "CCW") {
					currentDirection = "CCW";
					command.push(value);
				}
				value--;
			}
			if (value == 27)
				value = 1;
			if (value == 0) {
				value = 26;
			}
			$("#cursor").rotate((value-1) * 360 / 26);
			function addLetterOnPause() {
				command.push(value);
				funcTimeout2 = setTimeout(finishTyping, 1000);
			}
			funcTimeout1 = setTimeout(addLetterOnPause, 1000);
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
	// var enterText = document.getElementById("enter_text");
	// enterText.addEventListener("click", function() {
	// if (currentDirection == "CW") {
	// command = command + "+" + counter;
	// } else {
	// command = command + "-" + counter;
	// }
	// counter = 0;
	// value = 0;
	// alert(command);
	//
	// showDataRecord(command);
	//
	// command = "";
	// currentDirection = "";
	// });
	//
	// function valueToLetter(value) {
	// String.fromCharCode(94 + value);
	// }
	function finishTyping() {
		showDataRecord(command);
		command = [];
		currentDirection = "";
	}

}());
