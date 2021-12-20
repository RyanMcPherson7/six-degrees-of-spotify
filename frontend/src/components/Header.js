const Header = () => {
  return (
    <header>
      <h1>Six Degrees of Spotify</h1>
      <h4>
        Handcrafted by{' '}
        <a
          href='https://ryanmcpherson7.github.io/ryan-mcpherson-portfolio/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Ryan McPherson
        </a>
      </h4>
      <div id='description-container'>
        <p>
          Enter <span className='special'>2 artists</span> and we'll find an{' '}
          <span className='special'>optimal path</span> between them using
          Spotify's <span className='special'>related artists feature</span>!
        </p>
      </div>
    </header>
  );
};

export default Header;
