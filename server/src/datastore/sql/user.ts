import { User } from '../../types';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

interface UserDao {
  _createUser(user: User): Promise<void>;
  _getUserById(id: string): Promise<User | undefined>;
  _getUserByEmail(email: string): Promise<User | undefined>;
  _getUserByUsername(username: string): Promise<User | undefined>;
}

export class Users implements UserDao {
  constructor(private db: Database<sqlite3.Database, sqlite3.Statement>) {}

  async _createUser(user: User): Promise<void> {
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
  async _getUserById(id: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE id=?', id);
  }
  async _getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE email=?', email);
  }
  async _getUserByUsername(userName: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE userName=?', userName);
  }
}
