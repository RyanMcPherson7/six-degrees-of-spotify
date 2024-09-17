import RecommendationCard from './RecommendationCard'

const Recommendations = () => {
  const recs = [
    { start: 'Porter Robinson', end: 'Taylor Swift' },
    { start: 'The Marías', end: 'Ken Carson' },
    { start: 'BTS', end: 'Big Time Rush' },
    { start: 'The Beatles', end: 'The Strokes' },
    { start: 'Deftones', end: 'Katy Perry' },
    { start: 'Coldplay', end: 'Bad Bunny' },
  ]

  return (
    <div id="recommendations">
      <h4 id="recommendation-text">You could also try:</h4>
      <div id="recommendations-list">
        {recs.map((rec) => (
          <RecommendationCard startName={rec.start} endName={rec.end} />
        ))}
      </div>
    </div>
  )
}

export default Recommendations
