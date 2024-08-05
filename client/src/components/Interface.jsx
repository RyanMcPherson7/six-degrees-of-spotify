import { useState, useEffect } from 'react'
import { FaLongArrowAltDown, FaRandom, FaTelegramPlane } from 'react-icons/fa'
import getPath from '../api/get-path'
import getRandomArtist from '../api/get-random-artists'
import MainContentPanel from './MainContentPanel'
import getArtistNameList from '../api/get-artist-names-list'

const Interface = () => {
  const [artistPath, setArtistPath] = useState({ valid: true, path: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [startName, setStartName] = useState('')
  const [endName, setEndName] = useState('')
  const [artistNamesList, setArtistNamesList] = useState([])
  const [autocompStartNames, setAutocompStartNames] = useState([])
  const [autocompEndNames, setAutocompEndNames] = useState([])

  const fetchArtistNamesList = async () => {
    const res = await getArtistNameList()
    setArtistNamesList(res.artistNamesList)
  }

  const onSubmitPath = async () => {
    setIsLoading(true)
    const res = await getPath(startName, endName)
    setIsLoading(false)
    setArtistPath(res)
  }

  const onSubmitRandom = async () => {
    setStartName('...')
    setEndName('...')
    setIsLoading(true)
    const res = await getRandomArtist()
    setIsLoading(false)
    setStartName(res.start)
    setEndName(res.end)
    setArtistPath(res)
  }

  // fetch all artist names on initial render
  useEffect(() => {
    fetchArtistNamesList()
  }, [])

  // grab limited number of names that match input string
  // to render inside datalist to reduce number of
  // (useless) elements in DOM for autocomplete
  useEffect(() => {
    if (startName.length < 3) return

    setAutocompStartNames(
      artistNamesList.filter((name) =>
        name.toLowerCase().includes(startName.toLowerCase())
      )
    )
  }, [startName])

  useEffect(() => {
    if (endName.length < 3) return

    setAutocompEndNames(
      artistNamesList.filter((name) =>
        name.toLowerCase().includes(endName.toLowerCase())
      )
    )
  }, [endName])

  return (
    <>
      <form autoComplete="off">
        <input
          id="start-artist-input"
          type="text"
          placeholder="Enter Start Artist"
          list="start-input-options"
          value={startName}
          onChange={(e) => setStartName(e.target.value)}
        />
        <datalist id="start-input-options">
          {startName.length >= 3 &&
            autocompStartNames.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
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
          value={endName}
          onChange={(e) => setEndName(e.target.value)}
        />
        <datalist id="end-input-options">
          {endName.length >= 3 &&
            autocompEndNames.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
        </datalist>

        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmitPath()
          }}
          type="submit"
        >
          <FaTelegramPlane style={{ marginRight: '0.25rem' }} />
          Find Path
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmitRandom()
          }}
          type="submit"
        >
          <FaRandom style={{ marginRight: '0.25rem' }} />
          Random
        </button>
      </form>
      <MainContentPanel pathApiRes={artistPath} isLoading={isLoading} />
    </>
  )
}

export default Interface
