import {Filme} from '../types'
import filmeScraper from './filmeScraper'
import {db} from '../datastore'

const findFilmeByNameAndUpdate = async (
  currentFilmesList: Filme[],
  newFilmesList: Filme[],
) => {
  for (let newFilme of newFilmesList) {
    for (let currentFilme of currentFilmesList) {
      if (
        newFilme.originalName === currentFilme.originalName &&
        newFilme.list250 !== currentFilme.list250
      ) {
        await db.updateFilmeList250(currentFilme.originalName, newFilme.list250)

        console.log('updateFilmeList250 :', newFilme)
      }
    }
  }
}
const findFilmeByNameAndCreate = async (
  currentFilmesList: Filme[],
  newFilmesList: Filme[],
) => {
  const results = newFilmesList.filter((newFilme) => {
    return !currentFilmesList.find(
      (currentFilme) => currentFilme.originalName === newFilme.originalName,
    )
  })
  if (results.length <= 0) {
    return
  } else {
    for (let filme of results) {
      await db.cerateFilme(filme)
      console.log('created new filme list250', filme)
    }
  }
}

const lagacyFilme = async (
  currentFilmesList: Filme[],
  newFilmesList: Filme[],
) => {
  const results = currentFilmesList.filter(
    (currentFilme) =>
      !newFilmesList.some(
        (newFilme) => newFilme.originalName === currentFilme.originalName,
      ),
  )
  if (results.length <= 0) {
    return
  } else {
    for (let filme of results) {
      if (filme.list250 !== null) {
        await db.updateFilmeList250(filme.originalName, undefined)
        console.log('updated lagacy filme', filme)
      }
    }
  }
}

const addAndUpdateFilmes = async () => {
  const currentFilmesList = await db.allFilmesList250()
  const newFilmesList = await filmeScraper()

  if (newFilmesList) {
    if (currentFilmesList.length === 0) {
      for (let filme of newFilmesList) {
     
        await db.cerateFilme(filme)
      }
     
      console.log('Created filmes list')
    } else {
      findFilmeByNameAndUpdate(currentFilmesList, newFilmesList)
      findFilmeByNameAndCreate(currentFilmesList, newFilmesList)
      lagacyFilme(currentFilmesList, newFilmesList)
    }
  }
}
export default addAndUpdateFilmes
