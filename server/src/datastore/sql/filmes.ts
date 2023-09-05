import { Filme } from '../../types';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

interface FilmeDao {
  _allFilmesList250(): Promise<Filme[]>;
  _filmesList250(): Promise<Filme[]>;
  _cerateFilme(filme: Filme): Promise<void>;
  _getFilmeById(id: string): Promise<Filme | undefined>;
  _getFilmeByOrignalName(originalName: string): Promise<Filme | undefined>;
  _updateFilmeList250(
    originalName: string,
    list250: number | undefined
  ): Promise<void>;
  _updateFilme(filme: Filme): Promise<void>;
  _deleteFilme(id: string): Promise<void>;
}

export class Filmes implements FilmeDao {
  constructor(private db: Database<sqlite3.Database, sqlite3.Statement>) {}

  async _allFilmesList250(): Promise<Filme[]> {
    return await this.db.all('SELECT * FROM filmes  ');
  }
  async _filmesList250(): Promise<Filme[]> {
    return await this.db.all(
      'SELECT * FROM filmes WHERE list250 > 0 AND list250 <= 250 ORDER BY list250 ASC'
    );
  }

  async _cerateFilme(filme: Filme): Promise<void> {
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
  async _getFilmeById(id: string): Promise<Filme | undefined> {
    return await this.db.get('SELECT * FROM filmes WHERE id=?', id);
  }
  async _getFilmeByOrignalName(
    originalName: string
  ): Promise<Filme | undefined> {
    const filmes = await this.db.get(
      'SELECT * FROM filmes WHERE originalname=? ',
      originalName
    );
    return filmes;
  }
  async _updateFilmeList250(
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
  async _updateFilme(filme: Filme): Promise<void> {
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

  async _deleteFilme(id: string): Promise<void> {
    await this.db.run('DELETE FROM filmes WHERE id=?', id);
  }
}
