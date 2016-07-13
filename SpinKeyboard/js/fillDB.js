var indexedDB = window.indexedDB || window.mozIndexedDB
		|| window.webkitIndexedDB || window.msIndexedDB, IDBTransaction = window.IDBTransaction
		|| window.webkitIDBTransaction || window.msIDBTransaction, baseName = "spin_dictionary", storeName = "patterns", request, db;

(function() {
	var wordData = [ {
		pattern : '+19-11+17-21+9',
		word : 'tizen'
	}, {
		pattern : '+22-18+14-14',
		word : 'awesome'
	}, {
		pattern : '+18',
		word : 'is'
	} ];
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
}());

function showDataRecord(pattern) {
	var transaction = db.transaction([ storeName ], "readonly");
	var objectstore = transaction.objectStore(storeName);
	if (objectstore != null) {

		var request = objectstore.get(pattern);
		if (request != null) {
			request.onsuccess = function(event) {
				console.log(event);
				var res = event.target.result;
				console.log(res);
				alert(res["word"]);
			}
		} else
			console.log("request is null");
	}
}
