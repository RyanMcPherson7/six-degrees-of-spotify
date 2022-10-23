import { useState, useEffect } from 'react'
import { FaLongArrowAltDown, FaRandom, FaTelegramPlane } from 'react-icons/fa'
import getPath from '../api/get-path'
import getRandomArtist from '../api/get-random-artists'
import MainContentPanel from './MainContentPanel'
import getArtistNameList from '../api/get-artist-names-list'

const Interface = () => {
  const [artistPath, setArtistPath] = useState({ valid: true, path: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [artistNamesList, setArtistNamesList] = useState([])
  const [startInput, setStartInput] = useState('')
  const [endInput, setEndInput] = useState('')

  const fetchArtistNamesList = async () => {
    const res = await getArtistNameList()
    setArtistNamesList(res.artistNamesList)
  }

  const onSubmitForm = async () => {
    setIsLoading(true)
    const res = await getPath(startInput, endInput)
    setIsLoading(false)
    setArtistPath(res)
  }

  const onSubmitRandom = async () => {
    setStartInput('...')
    setEndInput('...')
    setIsLoading(true)
    const res = await getRandomArtist()
    setIsLoading(false)
    setStartInput(res.start)
    setEndInput(res.end)
    setArtistPath(res)
  }

  useEffect(() => {
    fetchArtistNamesList()
  }, [])

  return (
    <>
      <form autoComplete="off">
        <input
          id="start-artist-input"
          type="text"
          placeholder="Enter Start Artist"
          list="start-input-options"
          value={startInput}
          onChange={(e) => setStartInput(e.target.value)}
        />
        <datalist id="start-input-options">
          {artistNamesList.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </datalist>

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
          list="end-input-options"
          value={endInput}
          onChange={(e) => setEndInput(e.target.value)}
        />
        <datalist id="end-input-options">
          {artistNamesList.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </datalist>

        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmitForm()
          }}
          type="submit"
        >
          <FaTelegramPlane style={{ marginRight: '0.2rem' }} />
          Find Path
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
