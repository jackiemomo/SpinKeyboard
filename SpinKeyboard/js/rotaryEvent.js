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
	
	function addLetterOnPause() {
		command.push(value);
		funcTimeout2 = setTimeout(finishTyping, 1000);
	}
	
	function finishTyping() {
		console.log(command);
		var text = JSON.stringify(command);
		text = text.replace("]", "");
		text = text.replace("[", "");
		var found = showDataRecord(text);
		if(!found){
			switch (command.length){
			case 1:
				allPossibleCombinations([3], function(a) { if(!found) found = showDataRecord((command[0]+a-1)); })
				break;
			case 2:
				allPossibleCombinations([3, 3], function(a, b) { if(!found) found = showDataRecord((command[0]+a-1) + ',' + (command[1]+b-1)); })
				break;
			case 3:
				allPossibleCombinations([3, 3, 3], function(a, b, c) { if(!found) found = showDataRecord((command[0]+a-1) + ',' + (command[1]+b-1) + ',' + (command[2]+c-1)); })
				break;
			case 4:
				allPossibleCombinations([3, 3, 3, 3], function(a, b, c, d) { if(!found) found = showDataRecord((command[0]+a-1) + ',' + (command[1]+b-1) + ',' + (command[2]+c-1) + ',' + (command[3]+d-1)); })
				break;
			case 5:
				allPossibleCombinations([3, 3, 3, 3, 3], function(a, b, c, d, e) { if(!found) found = showDataRecord((command[0]+a-1) + ',' + (command[1]+b-1) + ',' + (command[2]+c-1) + ',' + (command[3]+d-1) + ',' + (command[4]+e-1)); })
				break;
			case 6:
				allPossibleCombinations([3, 3, 3, 3, 3, 3], function(a, b, c, d, e, f) { if(!found) found = showDataRecord((command[0]+a-1) + ',' + (command[1]+b-1) + ',' + (command[2]+c-1) + ',' + (command[3]+d-1) + ',' + (command[4]+e-1) + ',' + (command[5]+f-1)); })
				break;
			case 7:
				allPossibleCombinations([3, 3, 3, 3, 3, 3, 3], function(a, b, c, d, e, f, g) { if(!found) found = showDataRecord((command[0]+a-1) + ',' + (command[1]+b-1) + ',' + (command[2]+c-1) + ',' + (command[3]+d-1) + ',' + (command[4]+e-1) + ',' + (command[5]+f-1) + ',' + (command[6]+g-1)); })
				break;
			}
		}
			
		command = [];
		currentDirection = "";
	}
	
	function allPossibleCombinations(lengths, fn) {
		  var n = lengths.length;

		  var indices = [];
		  for (var i = n; --i >= 0;) {
		    if (lengths[i] === 0) { return; }
		    if (lengths[i] !== (lengths[i] & 0x7ffffffff)) { throw new Error(); }
		    indices[i] = 0;
		  }

		  while (true) {
		    fn.apply(null, indices);
		    // Increment indices.
		    ++indices[n - 1];
		    for (var j = n; --j >= 0 && indices[j] === lengths[j];) {
		      if (j === 0) { return; }
		      indices[j] = 0;
		      ++indices[j - 1];
		    }
		  }
	}

}());
