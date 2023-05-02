import { openDB } from 'idb';

const initdb = async () =>
  openDB('fate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('fate')) {
        console.log('fate database already exists');
        return;
      }
      db.createObjectStore('fate', { keyPath: 'id', autoIncrement: true });
      console.log('fate database created');
    },
  });

// This PUT function will be called every time the editor loses focus.
// It is an auto-save feature.
export const putDb = async (content) => {
  try {
    console.log('POST to the database.');
    const fateDb = await openDB('fate', 1);
    // First, we clear all entries in the 'fate' objectStore to prevent overcrowding.
    // This ensures we will only ever have a max of 1 entry in this store.
    const clear = await fateDb
      .transaction('fate', 'readwrite')
      .objectStore('fate')
      .clear();
    // Now we write to the database.
    const result = await fateDb
      .transaction('fate', 'readwrite')
      .objectStore('fate')
      .add({ content });
    console.log('Data saved to database! ID of new content:', result);
  } catch (err) {
    console.error(err);
  }
}

export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const fateDb = await openDB('fate', 1);
    const result = fateDb
        .transaction('fate', 'readonly')
        .objectStore('fate')
        .get(0);
    console.log('Data fetched from database:', result);
    return result;
  } catch (err) {
    console.error('getDb not implemented');
  }
}

initdb();
