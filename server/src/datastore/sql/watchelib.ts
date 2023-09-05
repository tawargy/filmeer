import { Mylibrary, Mywatched } from '../../types';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

interface MywatchedDaow {
  _addToWatchedList(userId: string, filmeId: string): Promise<void>;
  _removeFromWatchedList(userId: string, filmeId: string): Promise<void>;
  _getWatchedUserList(userId: string): Promise<Mywatched[]>;
  _getWatchedUserFilme(
    userId: string,
    filmeId: string
  ): Promise<Mywatched | undefined>;
}

interface MylibraryDao {
  _addToLibrary(userId: string, filmeId: string): Promise<void>;
  _removeFromLibrary(userId: string, filmeId: string): Promise<void>;
  _getLibraryUserList(userId: string): Promise<Mylibrary[]>;
  _getLibraryUserFilme(
    userId: string,
    filmeId: string
  ): Promise<Mylibrary | undefined>;
}

export class WatcheLib implements MylibraryDao, MywatchedDaow {
  constructor(private db: Database<sqlite3.Database, sqlite3.Statement>) {}

  async _addToWatchedList(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'INSERT INTO mywatched (userId,filmeId) VALUES (?,?)',
      userId,
      filmeId
    );
  }
  async _removeFromWatchedList(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'DELETE FROM mywatched WHERE userId=? AND filmeId=?',
      userId,
      filmeId
    );
  }
  async _getWatchedUserList(userId: string): Promise<Mywatched[]> {
    return await this.db.all('SELECT * FROM mywatched WHERE userId=?', userId);
  }
  async _getWatchedUserFilme(
    userId: string,
    filmeId: string
  ): Promise<Mywatched | undefined> {
    return await this.db.get(
      'SELECT * FROM mywatched WHERE userId=? AND filmeId=?',
      userId,
      filmeId
    );
  }

  async _addToLibrary(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'INSERT INTO mylibrary (userId,filmeId) VALUES (?,?)',
      userId,
      filmeId
    );
  }
  async _removeFromLibrary(userId: string, filmeId: string): Promise<void> {
    await this.db.run(
      'DELETE FROM mylibrary WHERE userId=? AND filmeId=?',
      userId,
      filmeId
    );
  }
  async _getLibraryUserList(userId: string): Promise<Mylibrary[]> {
    return await this.db.all('SELECT * FROM mylibrary WHERE userId=?', userId);
  }
  async _getLibraryUserFilme(
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
