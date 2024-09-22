/**
 * @param {*} nameToIdMap name -> set([ids])
 * @returns sorted list of all available artist names including artists with duplicate stylized names
 */
const getArtistNameList = (nameToIdMap) => {
  const namesList = []

  nameToIdMap.forEach((idSet, name) => {
    namesList.push(name)
    for (let i = 1; i < idSet.size; i++) {
      namesList.push(`${name} (${i + 1})`)
    }
  })

  return {
    artistNamesList: namesList.sort(),
  }
}

module.exports = { getArtistNameList }
