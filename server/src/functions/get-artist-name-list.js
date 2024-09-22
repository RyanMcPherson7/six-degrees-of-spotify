/**
 * @param {Map} metaDataMap artistId -> { name, id, image }
 * @param {*} nameToIdMap name -> set([ids])
 * @returns sorted list of all available artist names including artists with duplicate stylized names
 */
const getArtistNameList = (metaDataMap, nameToIdMap) => {
  const namesList = []

  nameToIdMap.forEach((idSet, name) => {
    const stylizedName = metaDataMap.get([...nameToIdMap.get(name)][0]).artist

    namesList.push(stylizedName)
    for (let i = 1; i < idSet.size; i++) {
      namesList.push(`${stylizedName} (${i + 1})`)
    }
  })

  return {
    artistNamesList: namesList.sort(),
  }
}

module.exports = { getArtistNameList }
