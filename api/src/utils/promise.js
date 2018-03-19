
// identity function
const I = x => x

// executes promises batch by batch and returns all the results
export const batchPromises = async (operations, transform = I, size = 10) => {
  let results = []
  const _operations = operations.slice()
  while (_operations.length) {
    const slice = _operations.splice(0, size)
    const sliceResults = await Promise.all(slice.map(op => op()))
    results = results.concat(sliceResults.map(transform))
  }
  return results
}
