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

export const putDb = async (content) => {
  try {
    console.log('Calling putDb() to post(?) to the database.');
    const fateDb = await openDB('fate', 1);
    const result = await fateDb
      .transaction('fate', 'readwrite')
      .objectStore('fate')
      .add({ content }); // FIXME: does this need to be an object? Or can I just pass 'content' straight in?
    console.log('Data saved to database!', result);
  } catch (err) {
    console.error('putDb not implemented');
  }
}

export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const fateDb = await openDB('fate', 1);
    const result = contactsDb
        .transaction('fate', 'readonly')
        .objectStore('fate')
        .getAll();
    console.log('Data fetched from database:', result);
    return result;
  } catch (err) {
    console.error('getDb not implemented');
  }
}

initdb();
