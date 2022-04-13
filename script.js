const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable Button
const toggleButton = () => {
   button.disabled = !button.disabled
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
   console.log('tell me: ', joke)
   VoiceRSS.speech({
      key: '7814942715ec400389ab64b174520a55',
      src: joke,
      hl: 'en-us',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
   })
}

// Get Jokes from Joke API
async function getJokes() {
   let joke = ''
   const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,racist'
   try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (data.setup) {
         joke = `${data.setup}... ${data.delivery}`
      } else {
         joke = data.joke
      }
      // Text-to-Speech
      tellMe(joke)
      // Disable Button
      toggleButton()
   } catch (e) {
      console.log(e)
   }
}

// Event Listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)