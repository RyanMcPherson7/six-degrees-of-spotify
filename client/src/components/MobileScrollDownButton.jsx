import { useState, useEffect } from 'react'
import { FaArrowAltCircleDown } from 'react-icons/fa'

const MobileScrollDownButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollDurationMs = 2000

  function smoothScrollTo(position, duration) {
    const start = window.scrollY
    const distance = position - start
    let startTime = null

    function animation(currentTime) {
      if (!startTime) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      window.scrollTo(0, start + distance * progress)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    requestAnimationFrame(animation)
  }

  // scroll position listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      id="mobile-result-arrow-button"
      style={{
        left: scrollPosition < 400 ? '8vw' : '-40px',
      }}
    >
      <FaArrowAltCircleDown
        id="mobile-result-down-arrow"
        onClick={() =>
          smoothScrollTo(
            document.documentElement.scrollHeight - 700,
            scrollDurationMs 
          )
        }
      />
    </div>
  )
}

export default MobileScrollDownButton
