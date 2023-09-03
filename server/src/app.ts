import express from 'express'
import {db} from './datastore'
const app: express.Application = express()

app.get('/filmes', async (req, res) => {
  const filmes = await db.allFilmesList250()
  filmes.forEach((filme: any) => {
    filme.originalName = undefined!
  })
  res.status(200).send({data: filmes})

})

export default app
