import {FilmeDao} from './dao/FilmeDao'
import {UserDao} from './dao/UserDao'
import {MywatchedDaow} from './dao/MywatchedDao'
import {MylibraryDao} from './dao/MylibraryDao'
import {SqlDataStore} from './sql'

export interface Datastore extends UserDao,FilmeDao,MylibraryDao,MywatchedDaow{}


export let db:Datastore;

export async function initDb(){
  db=await new SqlDataStore().openDb()
}
