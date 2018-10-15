const {
  logInfo,
  logError,
  logSystem,
  logWarn,
  stripQuotes,
  tokenizer,
  helpText
} = require('./helpers')

const songTable = new Map()

/** Local Test Data
const _bootStrapData = [
  { name: 'Automatic', played: false, artist: 'The Pointer Sisters' },
  { name: 'Beats to the Rhyme', played: false, artist: 'RunDMC' },
  { name: 'Human Nature', played: false, artist: 'Michael Jackson' },
  { name: 'Free', played: false, artist: 'Kenny Loggins' },
  { name: 'Mariposa', played: false, artist: 'Freeez' },
  { name: 'Wind Parade', played: true, artist: 'Donald Byrd' },
  { name: 'Being Broke Made Me Rich', played: true, artist: 'Lecrae' }
]

(function _bootstrap(list) {
  list.forEach((song) => {
    songTable.set(song.name, song)
  })
})(_bootStrapData)
 */

function handleQuit() {
  logSystem('Bye!')
  process.exit(1)
}


/** ----- ADDS ----- */
function handleAdd([rawSong, rawArtist]) {
  if (!rawSong || !rawArtist) {
    logWarn(`don't forget to both add the song and the artist ${helpText}`)
    return
  }
  const song = stripQuotes(rawSong)
  const artist = stripQuotes(rawArtist)

  if (songTable.has(song)) {
    logError(`"${song}" is already in your playlist`)
    return
  }

  songTable.set(song, { name: song, played: false, artist })
  logInfo(`Added "${song}" by ${artist}`)
}


function handleShow(command, qualifier, details) {
  let currentSongs = [...songTable.values()]
  let [artist] = details || []

  if (!currentSongs.length) {
    logWarn('There are no songs in your playlist!')
    return
  }


  if (artist) {
    const artistName = stripQuotes(artist.trim())
    currentSongs = currentSongs.filter(song => song.artist === artistName)

    if (!currentSongs) {
      logError(`artist "${artistName}" is not in your playlist`)
      return
    }
  }

  if (qualifier && ['played', 'unplayed'].includes(qualifier)) {
    const shouldShowPlayed = qualifier.trim() === 'played'
    currentSongs = currentSongs.filter(song => song.played === shouldShowPlayed)
  }

  if (!currentSongs.length) {
    logWarn(`There are no ${qualifier ? qualifier + ' ' : ''}songs in your playlist!`)
    return
  }


  currentSongs.forEach(({ name, artist, played }) => {
    const playedText = played ? 'played' : 'unplayed'
    logInfo(`"${name}" by ${artist} (${playedText})`)
  })
}



/** ----- PLAY ----- */
function handlePlay(details) {
  if (!details) {
    logError(`please pass a song with the "play" command:`)
    logInfo(helpText)
    return
  }
  const song = stripQuotes(details[0])
  const songObj = songTable.get(song)

  if (songObj) {
    songObj.played = true
    logInfo(`You're listening to "${song}"`)
  } else {
    logWarn(`"${song}" is not in your playlist`)
  }
}

module.exports = { handleShow, handleAdd, handlePlay, handleQuit }
