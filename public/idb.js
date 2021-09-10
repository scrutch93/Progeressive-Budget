
window.indexDB =window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;



let request = window.indexedDB.open ("dbTransaction", 1),
    db,
    tx,
    store,
    index;

request.onupgradeneeded = function (e)  {

    let db = request.result,
    store =db.createObjectStore("TransactionStore", {autoIncrement: true})
    index = store.createIndex ("name", "name", {unique: false});
};

request.onerror = function (e) {
    console.log ("error")
};

request.onsuccess = function (e) {
    db = request.result;
    tx =db.transaction("TransactionStore", "readwrite");
    store = tx.objectStore("TransactionStore");
    index =store.index ("name");

    db.onerror = function(e) {
        console.log("ERROR" + e.target.errorCode);
    }

    
}

tx.oncomplete = function() {
    db.save();
}
