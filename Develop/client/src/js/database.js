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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {

  } catch (err) {
    console.error('putDb not implemented');
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {

  } catch (err) {
    console.error('putDb not implemented');
  }
}

initdb();
