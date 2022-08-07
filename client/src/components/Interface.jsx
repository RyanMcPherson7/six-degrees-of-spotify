import { useState } from 'react'
import { FaLongArrowAltDown, FaRandom, FaTelegramPlane } from 'react-icons/fa'
import getPath from '../api/get-path'
import getRandomArtist from '../api/get-random-artists'
import MainContentPanel from './MainContentPanel'

const Interface = () => {
  const [artistPath, setArtistPath] = useState({ valid: true, path: [] })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitForm = async () => {
    const start = document.querySelector('#start-artist-input').value
    const end = document.querySelector('#end-artist-input').value
    setIsLoading(true)
    const res = await getPath(start, end)
    setIsLoading(false)
    setArtistPath(res)
  }

  const onSubmitRandom = async () => {
    setIsLoading(true)
    const res = await getRandomArtist()
    setIsLoading(false)
    document.querySelector('#start-artist-input').value = res.start
    document.querySelector('#end-artist-input').value = res.end
    setArtistPath(res)
  }

  return (
    <>
      <form autoComplete="off">
        <input
          id="start-artist-input"
          type="text"
          placeholder="Enter Start Artist"
        />
        <FaLongArrowAltDown
          style={{
            width: '2rem',
            height: '2rem',
            color: 'var(--color-green)',
            margin: '0.2rem 0',
          }}
        />
        <input
          id="end-artist-input"
          type="text"
          placeholder="Enter End Artist"
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmitForm()
          }}
          type="submit"
        >
          <FaTelegramPlane style={{ marginRight: '0.2rem' }} />
          Let's Go!
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmitRandom()
          }}
          type="submit"
        >
          <FaRandom style={{ marginRight: '0.2rem' }} />
          Random
        </button>
      </form>
      <MainContentPanel pathApiRes={artistPath} isLoading={isLoading} />
    </>
  )
}

export default Interface
