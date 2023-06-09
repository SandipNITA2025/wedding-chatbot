import { openDB } from 'idb';

const DB_NAME = 'imageHubDB';
const STORE_NAME = 'imageCollections';
const DB_VERSION = 1;

export const cacheData = async (data) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  store.put(data, 'imgCollections');
  await tx.complete;
  db.close();
};

export const getCachedData = async () => {
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(STORE_NAME);
    const store = tx.objectStore(STORE_NAME);
    const data = await store.get('imgCollections');
    await tx.complete;
    db.close();
    return data;
  };
  
