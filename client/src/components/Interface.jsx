import { useState } from 'react'
import { FaLongArrowAltDown, FaRandom, FaTelegramPlane } from 'react-icons/fa'
import getPath from '../api/get-path'
import getRandomArtist from '../api/get-random-artists'
import ArtistPanel from './ArtistPanel'

const Interface = () => {
  const [artistPath, setArtistPath] = useState({ valid: true, path: [] })

  const onSubmitForm = async () => {
    const start = document.querySelector('#start-artist-input').value
    const end = document.querySelector('#end-artist-input').value
    const res = await getPath(start, end)
    setArtistPath(res)
  }

  const onSubmitRandom = async () => {
    const randomArtists = await getRandomArtist()
    document.querySelector('#start-artist-input').value = randomArtists.start
    document.querySelector('#end-artist-input').value = randomArtists.end
    onSubmitForm()
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
      <ArtistPanel pathApiRes={artistPath} />
    </>
  )
}

export default Interface
