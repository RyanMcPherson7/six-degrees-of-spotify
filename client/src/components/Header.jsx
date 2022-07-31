const Header = () => (
  <header>
    <h1>6 Degrees of Spotify</h1>
    <h4>
      Built by{' '}
      <a
        href="https://ryanmcpherson7.github.io/ryan-mcpherson-portfolio/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ryan McPherson
      </a>
    </h4>
    <div id="description-container">
      <p>
        Enter <span className="special">2 popular artists</span> and we'll
        generate a <span className="special">graph network</span> based on
        Spotify's "<span className="special">fans also listen to</span>" feature
        to see how <span className="special">connected</span> your 2 artists
        are!
      </p>
    </div>
  </header>
)

export default Header
