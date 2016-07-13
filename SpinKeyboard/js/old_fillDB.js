var indexedDB = window.indexedDB || window.mozIndexedDB
		|| window.webkitIndexedDB || window.msIndexedDB, 
		IDBTransaction = window.IDBTransaction
		|| window.webkitIDBTransaction || window.msIDBTransaction, 
		baseName = "dictionary", 
		storeName = "patterns";

function logerr(err) {
	console.log(err);
}

function connectDB(f) {
	var request = indexedDB.open(baseName, 1);
	request.onerror = logerr;
	request.onsuccess = function() {
		f(request.result);
	}
	request.onupgradeneeded = function(e) {
		var objectStore = e.currentTarget.result.createObjectStore(storeName, {
			autoIncrement : true
		});
		connectDB(f);
	}
}

function getData(key, f) {
	connectDB(function(db) {
		var request = db.transaction([ storeName ], "readonly").objectStore(
				storeName).get(key);
		console.log(key);
		console.log(request);
		request.onerror = logerr;
		request.onsuccess = function() {
			f(request.result ? request.result : -1);
		}
	});
}

function getStorage(f) {
	connectDB(function(db) {
		var rows = [], store = db.transaction([ storeName ], "readonly")
				.objectStore(storeName);

		if (store.mozGetAll)
			store.mozGetAll().onsuccess = function(e) {
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if (cursor) {
					rows.push(cursor.value);
					cursor.continue();
				} else {
					f(rows);
				}
			};
	});
}

function setData(obj) {
	connectDB(function(db) {
		var request = db.transaction([ storeName ], "readwrite").objectStore(
				storeName).add(obj);
		request.onerror = logerr;
		request.onsuccess = function() {
			return request.result;
		}
	});
}

function delData(key) {
	connectDB(function(db) {
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).delete(key);
		request.onerror = logerr;
		request.onsuccess = function() {
			console.log("File deleted from DB:", file);
		}
	});
}

function clearStorage() {
	connectDB(function(db) {
		var request = db.transaction([ storeName ], "readwrite").objectStore(
				storeName).clear();
		
		request.onerror = logerr;
		request.onsuccess = function() {
			console.log("Clear");
		}
	});
}

function loadDB(){
	clearStorage();
	setData({pattern : '+18-9+15-19+7',	word : 'tizen'});
	setData({pattern : '+22-16+12-12',	word : 'awesome'});
	setData({pattern : '+17',	word : 'is'});
}