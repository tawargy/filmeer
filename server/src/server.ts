import app from './app';
import {initDb} from './datastore'
import addAndUpdateFilmes from './filmesCollector/addAndUpdateFilmes'



(async()=>{
await initDb();

const PORT:number=5000 
app.listen(PORT,()=>{
  console.log('server is running')
})
await addAndUpdateFilmes()
})()

