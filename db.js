let db = null;
document.getElementById("id_openDB").onclick = () => {
  const request = indexedDB.open("testdb", 1);
  request.onupgradeneeded = () => {
    console.log("onupgradeneeded");
    db = request.result;
    db.createObjectStore('books', {keyPath: 'id'});
  };
  request.onsuccess = () => {
    db = request.result;
    console.log("onsuccess");
  };
  request.onerror = () => {
    console.log("onerror", request.error);
  };
}

document.getElementById("id_add").onclick = () => {
  const id = document.getElementById("id_id").value;
  const price = document.getElementById("id_price").value;
  const transaction = db.transaction("books", "readwrite");
  const books = transaction.objectStore("books");
  const book = {id: id, price: price, created: new Date()};
  const request = books.add(book);
  request.onsuccess = () => {
    console.log("onsuccess");
  };
  request.onerror = () => {
    console.log("onerror", request.error);
  };
}

document.getElementById("id_get").onclick = () => {
  const transaction = db.transaction("books", "readonly");
  const books = transaction.objectStore("books");
  const id = document.getElementById("id_id").value;
  const request = books.get(id);
  request.onsuccess = () => {
    console.log("onsuccess",request.result);
  };
  request.onerror = () => {
    console.log("onerror", request.error);
  };
}

document.getElementById("id_getAll").onclick = () => {
  const transaction = db.transaction("books", "readonly");
  const books = transaction.objectStore("books");
  const request = books.getAll();
  request.onsuccess = () => {
    document.write(request.result)
  };
  request.onerror = () => {
    console.log("onerror", request.error);
  };
}