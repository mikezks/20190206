import Dexie from 'dexie';

export const basketTableName = 'basket';

const schema: { [key: string]: string } = {};

export const db = new Dexie('flightdb');

schema[basketTableName] = '++id,date';
db.version(1).stores(schema);

schema[basketTableName] = '++id';
db.version(2).stores(schema);
