import app from './app'
import {initDb} from './datastore'

;(async () => {
  await initDb()

  const PORT: number = 5000
  app.listen(PORT, () => {
    console.log('server is running')
  })
})()
