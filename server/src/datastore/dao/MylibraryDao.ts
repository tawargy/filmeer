import {Mylibrary} from '../../types'

export interface MylibraryDao{
addToLibrary(userId:string,filmeId:string):Promise<void>
removeFromLibrary(userId:string,filmeId:string):Promise<void>
getLibraryUserList(userId:string):Promise<Mylibrary[]>
getLibraryUserFilme(userId:string,filmeId:string):Promise<Mylibrary|undefined>
}
