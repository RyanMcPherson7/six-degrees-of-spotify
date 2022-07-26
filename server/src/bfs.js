const { Queue } = require('./classes/queue')

const BFS = (graph, start, end) => {
  const visited = new Set()
  const parent = new Map()
  const q = new Queue()
  let found = false

  q.enqueue(start)
  visited.add(start)
  parent.set(start, '-1')

  if (start === end) {
    return parent
  }

  while (!q.empty() && !found) {
    const front = q.dequeue()

    graph.adjList.get(front).forEach((neighbor) => {
      if (neighbor === end) {
        parent.set(end, front)
        found = true
      } else if (!visited.has(neighbor)) {
        q.enqueue(neighbor)
        parent.set(neighbor, front)
        visited.add(neighbor)
      }
    })
  }

  return parent
}

module.exports = { BFS }
