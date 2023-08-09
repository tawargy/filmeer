import {Filme, FilmeUpdate} from '../../types'


export interface FilmeDao{
  allFilmesList250():Promise<Filme[]>
  filmesList250():Promise<Filme[]>
  cerateFilme(filme:Filme):Promise<void>
  getFilmeById(id:string):Promise<Filme|undefined>
  getFilmeByOrignalName(originalName:string):Promise<Filme|undefined>
  updateFilmeList250(originalName:string,list250:number|undefined):Promise<void>
  updateFilme(filme:Filme):Promise<void>
  deleteFilme(id:string):Promise<void>
}
