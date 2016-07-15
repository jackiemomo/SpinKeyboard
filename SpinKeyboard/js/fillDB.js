var indexedDB = window.indexedDB || window.mozIndexedDB
		|| window.webkitIndexedDB || window.msIndexedDB, IDBTransaction = window.IDBTransaction
		|| window.webkitIDBTransaction || window.msIDBTransaction, baseName = "spin_dictionary_2", storeName = "patterns", request, db;

var wordData = [ {
	pattern : "20,9,26,5,14",
	word : 'Tizen'
}, {
	pattern : '19,1,13,19,21,14,7',
	word : 'Samsung'
}, {
	pattern : '13,1,18,11',
	word : 'Mark'
}, {
	pattern : '10,1,3,11,9,5',
	word : 'Jackie'
}, {
	pattern : '9,19',
	word : 'is'
}, {
	pattern : '1,23,5,19,15,13,5',
	word : 'awesome'
}, {
	pattern : '20,8,5 ',
	word : 'the'
}, {
	pattern : '2,5',
	word : 'be'
}, {
	pattern : '20,15',
	word : 'to'
}, {
	pattern : '15,6',
	word : 'of'
}, {
	pattern : '1,14,04',
	word : 'and'
}, {
	pattern : '1',
	word : 'a'
}, {
	pattern : '9,14',
	word : 'in'
}, {
	pattern : '20,8,1,20',
	word : 'that'
}, {
	pattern : '8,1,22,5',
	word : 'have'
}, {
	pattern : '9',
	word : 'I'
}, {
	pattern : '9,20',
	word : 'it'
}, {
	pattern : '6,15,18',
	word : 'for'
}, {
	pattern : '14,15,20',
	word : 'not'
}, {
	pattern : '15,14',
	word : 'on'
}, {
	pattern : '23,9,20,8',
	word : 'with'
}, {
	pattern : '8,5',
	word : 'he'
}, {
	pattern : '1,19',
	word : 'as'
}, {
	pattern : '25,15,21',
	word : 'you'
}, {
	pattern : '1,20',
	word : 'at'
}, {
	pattern : '20,8,9,19',
	word : 'this'
}, {
	pattern : '2,21,20',
	word : 'but'
}, {
	pattern : '8,9,19',
	word : 'his'
}, {
	pattern : '2,25',
	word : 'by'
}, {
	pattern : '6,18,15,13',
	word : 'from'
}, {
	pattern : '20,8,5,25',
	word : 'they'
}, {
	pattern : '23,5',
	word : 'we'
}, {
	pattern : '19,1,25',
	word : 'say'
}, {
	pattern : '8,5,18',
	word : 'her'
}, {
	pattern : '19,8,5',
	word : 'she'
}, {
	pattern : '15,18',
	word : 'or'
}, {
	pattern : '1,14',
	word : 'an'
}, {
	pattern : '23,9,12',
	word : 'will'
}, {
	pattern : '13,25',
	word : 'my'
}, {
	pattern : '15,14,5',
	word : 'one'
}, {
	pattern : '1,12',
	word : 'all'
}, {
	pattern : '23,15,21,12,4',
	word : 'would'
}, {
	pattern : '20,8,5,18,5',
	word : 'there'
}, {
	pattern : '20,8,5,9,18',
	word : 'their'
}, {
	pattern : '23,8,1,20',
	word : 'what'
}, {
	pattern : '19,15',
	word : 'so'
}, {
	pattern : '21,16',
	word : 'up'
}, {
	pattern : '15,21,20',
	word : 'out'
}, {
	pattern : '9,6',
	word : 'if'
}, {
	pattern : '1,2,15,21,20',
	word : 'about'
}, {
	pattern : '23,8,15',
	word : 'who'
}, {
	pattern : '7,5,20',
	word : 'get'
}, {
	pattern : '7,15',
	word : 'go'
}, {
	pattern : '13,5',
	word : 'me'
}, {
	pattern : '23,8,5,14',
	word : 'when'
}, {
	pattern : '13,1,11,5',
	word : 'make'
}, {
	pattern : '3,1,14',
	word : 'can'
}, {
	pattern : '12,9,11,5',
	word : 'like'
}, {
	pattern : '20,9,13,5',
	word : 'time'
}, {
	pattern : '14,15',
	word : 'no'
}, {
	pattern : '10,21,19,20',
	word : 'just'
}, {
	pattern : '8,9,13',
	word : 'him'
}, {
	pattern : '11,14,15,23',
	word : 'know'
}, {
	pattern : '20,1,11,5',
	word : 'take'
} ];

(function() {
	loadDB();
}());

function loadDB() {
	var tizenDB = {};
	request = indexedDB.open(baseName);
	request.onsuccess = function(evt) {
		console.log("inside onsuccess");
		db = request.result;
	};

	request.onerror = function(evt) {
		console.log("IndexedDB error: " + evt.target.errorCode);
	};
	request.onupgradeneeded = function(evt) {
		console.log("inside onupgradeneeded");

		var objectStore = evt.currentTarget.result.createObjectStore(storeName,
				{
					keyPath : "pattern"
				});

		for (i in wordData) {
			objectStore.add(wordData[i]);
			console.log("added objectstore to db");
		}
	};
}

function showDataRecord(pattern) {
//	console.log(pattern);
	var transaction = db.transaction([ storeName ], "readonly");
	var objectstore = transaction.objectStore(storeName);
	if (objectstore !== null) {

		var request = objectstore.get(pattern);
		if (request !== null) {
			request.onsuccess = function(event) {
//				console.log(event);
				var res = event.target.result;
//				console.log(res);
				if (res != undefined) {
					document.getElementById("inputbox").innerHTML += res["word"]
							+ " ";
					return true;
				} else {
					return false;
				}
			};
		} else {
//			console.log("request is null");
		}
	}
}