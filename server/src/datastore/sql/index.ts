import path from 'path';
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { Filmes } from './filmes';
import { Users } from './user';
import { WatcheLib } from './watchelib';
import { Filme, User, Mywatched, Mylibrary } from '../../types';

export class SqlDataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  private filmeRepo!: Filmes;
  private userRepo!: Users;
  private watchelibRepo!: WatcheLib;

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
    this.filmeRepo = new Filmes(this.db);
    this.userRepo = new Users(this.db);
    this.watchelibRepo = new WatcheLib(this.db);
    return this;
  }
  // User========
  createUser(user: User): Promise<void> {
    return this.userRepo._createUser(user);
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.userRepo._getUserById(id);
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepo._getUserByEmail(email);
  }
  getUserByUsername(userName: string): Promise<User | undefined> {
    return this.userRepo._getUserByUsername(userName);
  }

  // filmes========

  allFilmesList250(): Promise<Filme[]> {
    return this.filmeRepo._allFilmesList250();
  }
  filmesList250(): Promise<Filme[]> {
    return this.filmeRepo._filmesList250();
  }
  createFilme(filme: Filme): Promise<void> {
    return this.filmeRepo._cerateFilme(filme);
  }

  getFilmeById(id: string): Promise<Filme | undefined> {
    return this.filmeRepo._getFilmeById(id);
  }
  getFilmeByOrignalName(originalName: string): Promise<Filme | undefined> {
    return this.filmeRepo._getFilmeByOrignalName(originalName);
  }
  updateFilmeList250(
    originalName: string,
    list250: number | undefined
  ): Promise<void> {
    return this.filmeRepo._updateFilmeList250(originalName, list250);
  }
  updateFilme(filme: Filme): Promise<void> {
    return this.filmeRepo._updateFilme(filme);
  }
  deleteFilme(id: string): Promise<void> {
    return this.filmeRepo._deleteFilme(id);
  }

  //watchelib===========
  addToWatchedList(userId: string, filmeId: string): Promise<void> {
    return this.watchelibRepo._addToWatchedList(userId, filmeId);
  }
  removeFromWatchedList(userId: string, filmeId: string): Promise<void> {
    return this.watchelibRepo._removeFromWatchedList(userId, filmeId);
  }
  getWatchedUserList(userId: string): Promise<Mywatched[]> {
    return this.watchelibRepo._getWatchedUserList(userId);
  }
  getWatchedUserFilme(userId: string, filmeId: string) {
    return this.watchelibRepo._getWatchedUserFilme(userId, filmeId);
  }
  addToLibrary(userId: string, filmeId: string): Promise<void> {
    return this.watchelibRepo._addToLibrary(userId, filmeId);
  }
  removeFromLibrary(userId: string, filmeId: string): Promise<void> {
    return this.watchelibRepo._removeFromLibrary(userId, filmeId);
  }
  getLibraryUserList(userId: string): Promise<Mylibrary[]> {
    return this.watchelibRepo._getLibraryUserList(userId);
  }
  getLibraryUserFilme(
    userId: string,
    filmeId: string
  ): Promise<Mylibrary | undefined> {
    return this.watchelibRepo._getLibraryUserFilme(userId, filmeId);
  }
}
