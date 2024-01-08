import Dexie from 'dexie';

export interface IUsers {
  id?: number; // Primary key. Optional (autoincremented)
  email: string;
  name: string;
  password: string;
  providerName?: string;
}

export interface IFavorites {
  id?: number; // Primary key. Optional (autoincremented)
  movieId: number | string;
  userId: number | string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  genre_ids: Array<number | string>;
}

class Db extends Dexie {
  users!: Dexie.Table<IUsers, number>;
  favorites!: Dexie.Table<IFavorites, number>;
  
  constructor() {  
    super(import.meta.env.VITE_APP_NAME + '_db');
    
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)

    this.version(1).stores({
      users: '++id, &email, name, password, providerName',
      favorites: '++id, movieId, userId, title, backdrop_path, poster_path, *genre_ids',
    });
  }
}

export const db = new Db();

// Initial data
(async () => {
  const checkAvailable = await db.users
        .where('email').equals('john.doe@email.com')
        .limit(1).toArray();

  if(!checkAvailable?.length){
    await db.users.add({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'password',
    });
  }
})()

// await db.users.add({
//   name: 'Jane Doe',
//   email: 'jane.doe@email.com',
//   password: 'password',
// });
