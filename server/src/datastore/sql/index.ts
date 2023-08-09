import path from 'path';
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

import { Datastore } from '..';
import { Filme, User, Mywatched, Mylibrary } from '../../types';

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    //open the database
    this.db = await open({
      filename: path.join(__dirname, 'filmer.sqlite'),
      //filename: '/tmp/database.db',
      driver: sqlite3.Database,
    });
    this.db.run('PRAGMA foreign_keys=ON;');
    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }
  // User========
  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id,firstName,lastName,userName,email,password,rouls) VALUES (?,?,?,?,?,?,?)',
      user.id,
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.password,
      user.rouls
    );
  }
  async getUserById(id: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE id=?', id);
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE email=?', email);
  }
  async getUserByUsername(userName: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE userName=?', userName);
  }
  // Filme======
  async allFilmesList250(): Promise<Filme[]> {
    return await this.db.all('SELECT * FROM filmes  ');
  }
  async filmesList250(): Promise<Filme[]> {
    return await this.db.all(
      'SELECT * FROM filmes WHERE list250 > 0 AND list250 <= 250 ORDER BY list250 ASC'
    );
  }

  async cerateFilme(filme: Filme): Promise<void> {
    console.log(filme)
    await this.db.run(
      'INSERT INTO filmes (id,name,originalName,year,poster,url,imdbRating,list250) VALUES (?,?,?,?,?,?,?,?)',
      filme.id,
      filme.name,
      filme.originalName,
      filme.year,
      filme.poster,
      filme.url,
      filme.imdbRating,
      filme.list250
    );
  }
  async getFilmeById(id: string): Promise<Filme | undefined> {
    return await this.db.get('SELECT * FROM filmes WHERE id=?', id);
  }
  async getFilmeByOrignalName(
    originalName: string
  ): Promise<Filme | undefined> {
    const filmes = await this.db.get(
      'SELECT * FROM filmes WHERE originalname=? ',
      originalName
    );
    return filmes;
  }
  async updateFilmeList250(
    originalName: string,
    list250: number | undefined
  ): Promise<void> {
    let rating;
    if (!list250) {
      rating = null;
    } else {
      rating = list250;
    }
    await this.db.run(
      'UPDATE filmes SET list250=? WHERE originalName=? ',
      rating,
      originalName
    );
  }
  async updateFilme(filme: Filme): Promise<void> {
    await this.db.run(
      'UPDATE filmes SET name=?,originalName=?,poster=?,year=?,url=?,imdbRating=? WHERE id=? ',
      filme.name,
      filme.originalName,
      filme.poster,
      filme.year,
      filme.url,
      filme.imdbRating,
     filme.id
    );
  }

  async deleteFilme(id: string): Promise<void> {
      await this.db.run('DELETE FROM filmes WHERE id=?',id)
  }

  async addToWatchedList(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'INSERT INTO mywatched (userId,filmeId) VALUES (?,?)',
      userId,
      filmeId
    );
  }
  async removeFromWatchedList(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'DELETE FROM mywatched WHERE userId=? AND filmeId=?',
      userId,
      filmeId
    );
  }
  async getWatchedUserList(userId: string): Promise<Mywatched[]> {
    return await this.db.all('SELECT * FROM mywatched WHERE userId=?', userId);
  }
  async getWatchedUserFilme(
    userId: string,
    filmeId: string
  ): Promise<Mywatched | undefined> {
    return await this.db.get(
      'SELECT * FROM mywatched WHERE userId=? AND filmeId=?',
      userId,
      filmeId
    );
  }
  async addToLibrary(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'INSERT INTO mylibrary (userId,filmeId) VALUES (?,?)',
      userId,
      filmeId
    );
  }
  async removeFromLibrary(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'DELETE FROM mylibrary WHERE userId=? AND filmeId=?',
      userId,
      filmeId
    );
  }
  async getLibraryUserList(userId: string): Promise<Mylibrary[]> {
    return await this.db.all('SELECT * FROM mylibrary WHERE userId=?', userId);
  }
  async getLibraryUserFilme(
    userId: string,
    filmeId: string
  ): Promise<Mylibrary | undefined> {
    return await this.db.get(
      'SELECT * FROM mylibrary WHERE userId=? AND filmeId=?',
      userId,
      filmeId
    );
  }
}
