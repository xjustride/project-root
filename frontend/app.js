const apiUrl = 'http://192.168.49.2:31796/api/items'; // Zastąp IP jeśli będzie inne

// Pobierz wszystkie elementy z bazy danych
async function fetchItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();
    const list = document.getElementById('items-list');
    list.innerHTML = ''; // Wyczyść listę przed załadowaniem nowych danych
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.onclick = () => deleteItem(item.id);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Dodaj nowy element
async function addItem() {
    const itemName = document.getElementById('item-name').value;
    if (!itemName) return alert('Wprowadź nazwę przedmiotu!');
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: itemName }),
    });
    document.getElementById('item-name').value = '';
    fetchItems(); // Odśwież listę
}

// Usuń element
async function deleteItem(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
    fetchItems(); // Odśwież listę
}

// Załaduj dane przy starcie
fetchItems();