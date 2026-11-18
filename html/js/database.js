const AspirasDB = (() => {
    const NAME = 'suara_rakyat';
    const STORE = 'aspirasi';

    function open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(NAME, 1);

            request.onupgradeneeded = () => {
                if (!request.result.objectStoreNames.contains(STORE)) {
                    request.result.createObjectStore(STORE, { keyPath: 'id' });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function all() {
        const database = await open();
        const request = database.transaction(STORE, 'readonly')
            .objectStore(STORE)
            .getAll();

        const items = await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        database.close();
        return items.sort((a, b) => b.timestamp - a.timestamp);
    }

    async function saveAll(items) {
        const database = await open();
        const transaction = database.transaction(STORE, 'readwrite');
        const store = transaction.objectStore(STORE);

        store.clear();
        items.forEach(item => store.put(item));

        await new Promise((resolve, reject) => {
            transaction.oncomplete = resolve;
            transaction.onerror = () => reject(transaction.error);
        });

        database.close();
    }

    return { all, saveAll };
})();
