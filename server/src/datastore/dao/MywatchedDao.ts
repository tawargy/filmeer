import {Mywatched,Filme} from '../../types'

export interface MywatchedDaow{
addToWatchedList(userId:string,filmeId:string):Promise<void>
removeFromWatchedList(userId:string,filmeId:string):Promise<void>
getWatchedUserList(userId:string):Promise<Mywatched[]>
getWatchedUserFilme(userId:string,filmeId:string):Promise<Mywatched|undefined>
}
