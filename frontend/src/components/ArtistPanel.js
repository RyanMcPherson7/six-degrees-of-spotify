import PropTypes from 'prop-types';

export const ArtistPanel = ({ path }) => {
  return (
    <>{path instanceof String ? <div>{path}</div> : <div>valid path</div>}</>
  );
};


export default ArtistPanel;
