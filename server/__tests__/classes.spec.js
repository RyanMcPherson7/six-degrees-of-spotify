/* eslint no-undef: 0 */
const { Graph } = require('../src/classes/graph')
const { Queue } = require('../src/classes/queue')
const { Stack } = require('../src/classes/stack')

describe('classes', () => {
  describe('Graph', () => {
    it('should initialize an empty adjacently list', () => {
      // Act
      const graph = new Graph()

      // Assert
      expect(graph.adjList).not.toBeNull()
      expect(graph.adjList.size).toEqual(0)
    })
    it('should insert both items pointing to each other into the adjacency list ', () => {
      // Arrange
      const graph = new Graph()

      // Act
      graph.insert(1, 2)

      // Assert
      expect(graph.adjList.get(1)).toEqual([2])
      expect(graph.adjList.get(2)).toEqual([1])
    })
  })

  describe('Queue', () => {
    it('should initialize and empty store', () => {
      // Act
      const queue = new Queue()

      // Assert
      expect(queue.store).not.toBeNull()
      expect(queue.store.length).toEqual(0)
    })

    it('should correctly enqueue an item', () => {
      // Arrange
      const queue = new Queue()

      // Act
      queue.enqueue(1)
      queue.enqueue(2)
      queue.enqueue(3)

      // Assert
      expect(queue.store.length).toEqual(3)
      expect(queue.store[0]).toEqual(1)
      expect(queue.store[1]).toEqual(2)
      expect(queue.store[2]).toEqual(3)
    })

    it('should correctly dequeue an item', () => {
      // Arrange
      const queue = new Queue()
      queue.enqueue(1)
      queue.enqueue(2)
      queue.enqueue(3)

      // Act
      const firstItem = queue.dequeue()
      const secondItem = queue.dequeue()

      // Assert
      expect(queue.store.length).toEqual(1)
      expect(firstItem).toEqual(1)
      expect(secondItem).toEqual(2)
    })

    it('should return the front item in the queue', () => {
      // Arrange
      const queue = new Queue()
      queue.enqueue(1)
      queue.enqueue(2)
      queue.enqueue(3)

      // Act
      const first = queue.peek()

      // Assert
      expect(first).toEqual(1)
    })

    it('should return true when empty', () => {
      // Arrange
      const queue = new Queue()

      // Act
      queue.enqueue(1)
      queue.dequeue()
      const isEmpty = queue.empty()

      // Assert
      expect(isEmpty).toEqual(true)
    })

    it('should return false when not empty', () => {
      // Arrange
      const queue = new Queue()

      // Act
      queue.enqueue(1)
      const isEmpty = queue.empty()

      // Assert
      expect(isEmpty).toEqual(false)
    })

    it('should return the correct size of the queue', () => {
      // Arrange
      const queue = new Queue()
      queue.enqueue(1)
      queue.enqueue(2)
      queue.enqueue(3)

      // Act
      const size = queue.size()

      // Assert
      expect(size).toEqual(3)
    })
  })

  describe('Stack', () => {
    it('should initialize an empty store', () => {
      // Act
      const stack = new Stack()

      // Assert
      expect(stack.store).not.toBeNull()
      expect(stack.store.length).toEqual(0)
    })

    it('should correctly push an item', () => {
      // Arrange
      const stack = new Stack()

      // Act
      stack.push(1)
      stack.push(2)
      stack.push(3)

      // Assert
      expect(stack.store.length).toEqual(3)
      expect(stack.store[0]).toEqual(1)
      expect(stack.store[1]).toEqual(2)
      expect(stack.store[2]).toEqual(3)
    })

    it('should correctly pop an item', () => {
      // Arrange
      const stack = new Stack()
      stack.push(1)
      stack.push(2)
      stack.push(3)

      // Act
      const firstItem = stack.pop()
      const secondItem = stack.pop()

      // Assert
      expect(firstItem).toEqual(3)
      expect(secondItem).toEqual(2)
    })

    it('should return the top item of the stack', () => {
      // Arrange
      const stack = new Stack()
      stack.push(1)
      stack.push(2)
      stack.push(3)

      // Act
      const top = stack.top()

      // Assert
      expect(top).toEqual(3)
    })

    it('should return true when empty', () => {
      // Arrange
      const stack = new Stack()

      // Act
      stack.push(1)
      stack.pop()
      const isEmpty = stack.empty()

      // Assert
      expect(isEmpty).toEqual(true)
    })

    it('should return false when not empty', () => {
      // Arrange
      const stack = new Stack()

      // Act
      stack.push(1)
      const isEmpty = stack.empty()

      // Assert
      expect(isEmpty).toEqual(false)
    })

    it('should return the correct size of the stack', () => {
      // Arrange
      const stack = new Stack()
      stack.push(1)
      stack.push(2)
      stack.push(3)

      // Act
      const size = stack.size()

      // Assert
      expect(size).toEqual(3)
    })
  })
})
