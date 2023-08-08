import puppeteer from 'puppeteer'
import crypto from 'crypto'
import {Filme} from '../types'

const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'

const filmeScraper = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto(url)

  const filmesList: Filme[] = []

  const originalNames = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h3.ipc-title__text')!).map((e) => {
      let text = e.textContent?.trim() || ''
      const startIndex = text.indexOf('.') + 2
      const result = text.substring(startIndex)
      return result
    }),
  )
  const posters = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('.ipc-poster__poster-image .ipc-image')!,
    ).map((e) => e.getAttribute('src')!),
  )

  const imdbRating = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.ipc-rating-star--imdb')!).map(
      (e) => {
        const element = e as HTMLElement
        let result = element.innerText
        return result
      },
    ),
  )
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a.ipc-title-link-wrapper')!).map(
      (e) => `https://www.imdb.com${e.getAttribute('href')!}`,
    ),
  )

  const years = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.cli-title-metadata')!).map((e) => {
      const element = e as HTMLElement
      let result = element.innerText.trim().split('\n')[0]
      return result
    }),
  )

  for (let i = 0; i < originalNames.length; i++) {
    filmesList.push({
      id: crypto.randomUUID(),
      originalName: originalNames[i],
      name: originalNames[i],
      poster: posters[i],
      year: years[i],
      url: links[i],
      list250: i + 1,
      imdbRating: imdbRating[i],
    })
  }

  await browser.close()
  return filmesList
}
export default filmeScraper
